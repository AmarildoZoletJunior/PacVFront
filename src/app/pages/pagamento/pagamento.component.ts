import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoomResponse } from 'src/app/services/Interfaces/room-response';
import { AluguelService } from 'src/app/services/Services/Aluguel/aluguel.service';
import { CompartilharService } from 'src/app/services/Services/CompartilharInformacao/compartilhar.service';
import { PagamentoService } from 'src/app/services/Services/Pagamento/pagamento.service';
import { RoomService } from 'src/app/services/Services/Room/Servico/room.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css'],
})
export class PagamentoComponent implements OnInit {
  formulario!: FormGroup;
  informacaoService!: Array<any>;
  quarto!: RoomResponse;
  data1!:any
  data2!:any

  getClientId = this.cookieService.get('idUser');

  constructor(
    private aluguelService: AluguelService,
    private roomService: RoomService,
    private PaymentService: PagamentoService,
    private informacao: CompartilharService,
    private rota: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    const options = 'dd/MM/yyyy';
    this.informacaoService = this.informacao.enviarInformacao();
    this.data1 = this.datePipe.transform(this.informacaoService[0], options) || null;
    this.data2 = this.datePipe.transform(this.informacaoService[1], options) || null;
    this.informacaoService[1] = this.datePipe.transform(this.informacaoService[1], options);
    this.roomService.GetRoomById(this.informacaoService[4] ).subscribe(
      (x) => {
        this.quarto = x;
      },
      (error) => {
        window.confirm(
          'Infelizmente não encontramos o quarto que você deseja alugar, estamos te redirecionando para a pagina inicial.'
        );
        this.rota.navigate(['/homepage']);
      }
    );
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
      ]),
    });
  }

  enviarDados() {
    let bookingRoom = { start: '', clientId: 0, roomId: 0, end: '' };
    if (this.formulario.valid) {
      bookingRoom.clientId = parseInt(this.getClientId!);
      bookingRoom.roomId = this.informacaoService[4];
      bookingRoom.start = new Date(this.informacaoService[0]).toISOString();
      bookingRoom.end = new Date(this.informacaoService[1]).toISOString();
      this.aluguelService.postBooking(bookingRoom).subscribe((x) => {
        let json = {
          value: parseFloat(this.informacaoService[3]),
          clienteId: parseInt(this.getClientId!),
          bookingRoomId: x.id,
        };
        console.log(json);
        this.PaymentService.CreatePayment(json).subscribe(
          (x) => {
            window.confirm(
              'Parabéns, você efetuou seu pagamento e sua reserva foi criada com sucesso'
            );
            this.rota.navigate(['/home'])
          },
          (error) => {
            if(error  instanceof HttpErrorResponse){
              if(error.status == 401){
                this.cookieService.deleteAll()
                window.confirm(
                  'Ocorreu um erro de validação do seu usuário e você esta sendo redirecionado para a página de login.'
                );
                this.rota.navigate(['/login']);
              }
            }
          }
        );
      });
    }
  }
}
