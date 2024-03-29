import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/services/Services/Room/Servico/room.service';

@Component({
  selector: 'app-criar-quarto',
  templateUrl: './criar-quarto.component.html',
  styleUrls: ['./criar-quarto.component.css'],
})
export class CriarQuartoComponent implements OnInit {
  mensagemErro: string = '';
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

  constructor(private roomService: RoomService,private router:Router) {}

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
                 for (let imagem of this.Imagens) {
                   const formData = new FormData();
                   formData.append('file', imagem);
                   this.roomService
                     .PostImagensRoom(roomResponse.id, formData) //Postar as diferentes imagens
                     .subscribe((x) => console.log('Ok imagem passou'));
                 }
                 this.router.navigate(['/administrador'])
                 this.formulario.reset()
              },
              (error) => {
                if(error instanceof HttpErrorResponse){
                  if (error.error && Array.isArray(error.error) && error.error.length > 0) {
                    for (let i = 0; i < error.error.length; i++) {
                      const element = error.error[i];
                      this.mensagemErro += `ERRO: ${element.title}:  ${element.message}\n`;
                    }
                  }
                }
                console.log("erro imagem principal de quarto");
                this.router.navigate(['/administrador'])
                window.confirm("Erro ao criar a imagem, precisamos que você refaça o processo de atribuir imagem")
              }
            );
        },
        (error) => {
          if(error instanceof HttpErrorResponse){
            if (error.error && Array.isArray(error.error) && error.error.length > 0) {
              for (let i = 0; i < error.error.length; i++) {
                const element = error.error[i];
                this.mensagemErro += `ERRO: ${element.title}:  ${element.message}\n`;
              }
            }
          }
          window.confirm("Erro ao criar o quarto, precisamos que você refaça o processo inteiro.")
        }
      );
    }
  }
}
