import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit{
  formulario!:FormGroup;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      descricao: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      telefone: new FormControl('',[Validators.required,Validators.pattern("\d"),Validators.minLength(8)]),
      nome: new FormControl('',[Validators.required,Validators.minLength(3)])
    })
  }
  showModal = true;

  openModal() {
    this.showModal = true;
  }
}
