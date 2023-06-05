import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PagamentoService } from 'src/app/services/Services/Pagamento/pagamento.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export class PagamentoComponent implements OnInit {
  formulario!: FormGroup;

  constructor(private PaymentService: PagamentoService) {}
  ngOnInit(): void {
    this.formulario = new FormGroup({
      numeroCartao: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(16),
      ]),
      codigo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(3),
      ]),
      Nome: new FormControl('', [Validators.required]),
      CPF: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
        Validators.minLength(11),
      ])
    });
  }

  enviarDados() {
    console.log("entrou")
    if (this.formulario.valid) {
      console.log("testeEntrou")
      let teste = {"value":12,"clienteId":1,"bookingRoomId":1};
      this.PaymentService.CreatePayment(teste).subscribe(
        (x) => 
        {
          console.log(x)
        }
      );
    }
  }
}
