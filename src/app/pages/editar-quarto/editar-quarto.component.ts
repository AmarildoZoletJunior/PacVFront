import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editar-quarto',
  templateUrl: './editar-quarto.component.html',
  styleUrls: ['./editar-quarto.component.css']
})
export class EditarQuartoComponent implements OnInit{
  formulario!:FormGroup;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(3)])
    })
  }
  ImagemPrincipal: string = '';
  DemaisImagens: string = '';

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
      this.DemaisImagens += ", " + files[i].name;
    }
  }
}
