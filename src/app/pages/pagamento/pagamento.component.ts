import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit{
  formulario!:FormGroup;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      numeroCartao: new FormControl('',[Validators.required,Validators.pattern("\d"),Validators.minLength(16)]),
      codigo: new FormControl('',[Validators.required,Validators.pattern("\d"),Validators.minLength(3)]),
      Nome: new FormControl('',[Validators.required]),
      CPF: new FormControl('',[Validators.required,Validators.pattern("\d"),Validators.minLength(11)]),
      numerodoquarto: new FormControl('',[Validators.required,Validators.minLength(1),Validators.pattern("\d")]),
    })
  }
}
