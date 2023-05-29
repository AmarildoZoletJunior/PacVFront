import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-criar-quarto',
  templateUrl: './criar-quarto.component.html',
  styleUrls: ['./criar-quarto.component.css']
})
export class CriarQuartoComponent implements OnInit{
  ImagemPrincipal: string = '';
  DemaisImagens: string = '';
  formulario!:FormGroup;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      imagemprincipal: new FormControl('',[Validators.required]),
      imagensquarto: new FormControl('',[Validators.required]),
      NumeroDoQuarto: new FormControl('',[Validators.required]),
      Andar: new FormControl('',[Validators.required]),
      Nome: new FormControl('',[Validators.required]),
      Descricao: new FormControl('',[Validators.required]),
    })
  }

  ArquivoImagemPrincipalNome(event: any) {
    const file = event.target.files[0];
    this.ImagemPrincipal = file ? file.name : '';
  }
  ArquivoImagensSecundarias(event: any) {
    const files = event.target.files;
    let arrayNomes= [];
    for (let i = 0; i < files.length; i++) {
      arrayNomes.push(files[i].name);
      if(i ==0){
        this.DemaisImagens = files[i].name
      }
      this.DemaisImagens += ", " + files[i].name.substring(1,files[i].name.length > 10 ? 5 :  files[i].name.length);
    }
  }
}
