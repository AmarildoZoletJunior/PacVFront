import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-informacao-usuario',
  templateUrl: './informacao-usuario.component.html',
  styleUrls: ['./informacao-usuario.component.css']
})
export class InformacaoUsuarioComponent implements OnInit{
  formulario!:FormGroup;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      nome: new FormControl('',[Validators.required,Validators.minLength(3)]),
      sobrenome: new FormControl('',[Validators.required,Validators.minLength(3)]),
    })
  }
}
