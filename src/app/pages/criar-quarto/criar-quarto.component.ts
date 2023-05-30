import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RoomService } from 'src/app/services/Services/Room/Servico/room.service';

@Component({
  selector: 'app-criar-quarto',
  templateUrl: './criar-quarto.component.html',
  styleUrls: ['./criar-quarto.component.css'],
})
export class CriarQuartoComponent implements OnInit {
  ImagemPrincipalNome: string = '';
  DemaisImagensNome: string = '';
  formulario!: FormGroup;
  ImagemMain!: File;
  Imagens: Array<File> = []

  ngOnInit(): void {
    this.formulario = new FormGroup({
      imagemprincipal: new FormControl('', [Validators.required]),
      imagensquarto: new FormControl('', [Validators.required]),
      Number: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),Validators.maxLength(4)
      ]),
      Level: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),Validators.maxLength(4)
      ]),
      Name: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required]),
    });
  }

  selecionarImagemPrincipal(event: any) {
    this.ImagemMain = event.target.files[0];
    console.log('Usou o método de selecionar');
    console.log(this.ImagemMain);
  }
  ArquivoImagemPrincipalNome(event: any) {
    const file = event.target.files[0];
    this.ImagemPrincipalNome = file ? file.name : '';
  }
  ArquivoImagensSecundarias(event: any) {
    const files = event.target.files;
    let arrayNomes = [];
    for (let i = 0; i < files.length; i++) {
      arrayNomes.push(files[i].name);
      this.Imagens.push(event.target.files[i])
      if (i == 0) {
        this.DemaisImagensNome = files[i].name;
      }
      this.DemaisImagensNome +=
        ', ' +
        files[i].name.substring(
          1,
          files[i].name.length > 10 ? 5 : files[i].name.length
        );
    }
  }

  constructor(private roomService: RoomService) {}

  enviarDados() {
    if (this.formulario.valid) {
      this.roomService.CreateRoom(this.formulario.value).subscribe(  //Criar quarto
        (roomResponse) => {
          console.log(`Criou o quarto com o id ${roomResponse.id}`);
          const formData = new FormData();
          formData.append('file', this.ImagemMain);
          this.roomService
            .CreateImageMainRoom(roomResponse.id, formData)
            .subscribe( //Postar imagem principal
              (x) => {
                console.log(`Enviou a imagem principal.`);
                 for (let imagem of this.Imagens) {
                   const formData = new FormData();
                   formData.append('file', imagem);
                   this.roomService
                     .PostImagensRoom(roomResponse.id, formData) //Postar as diferentes imagens
                     .subscribe((x) => console.log('Ok imagem passou'));
                 }
                 this.formulario.reset()
              },
              (error) => {
                console.log("erro imagem principal de quarto");
              }
            );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
