import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format } from 'date-fns';
import { CookieService } from 'ngx-cookie-service';
import { AluguelQuartoInformacaoResponse } from 'src/app/services/Interfaces/AluguelQuartoInformacaoResponse';
import { AluguelService } from 'src/app/services/Services/Aluguel/aluguel.service';

@Component({
  selector: 'app-reserva-informacao',
  templateUrl: './reserva-informacao.component.html',
  styleUrls: ['./reserva-informacao.component.css'],
})
export class ReservaInformacaoComponent implements OnInit {
  AluguelResponse!: AluguelQuartoInformacaoResponse;
  idBookin!: number;
  constructor(
    private navegacao: ActivatedRoute,
    private aluguelService: AluguelService,
    private navigate: Router,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.idBookin = Number(this.navegacao.snapshot.paramMap.get('id'));
    this.aluguelService.getBookinForId(this.idBookin).subscribe((x) => {
      if(x.clientId == Number(this.cookieService.get("idUser"))){
        this.AluguelResponse = x
        console.log(x)
        this.AluguelResponse.start = format(new Date(this.AluguelResponse.start.split("T")[0]),'dd/MM/yyyy') 
        this.AluguelResponse.end = format(new Date(this.AluguelResponse.end.split("T")[0]),'dd/MM/yyyy') 
      }else{
        window.confirm("Infelizmente alguns informações sua não condiz com o esperado, estamos te deslogando e redirecionando para a pagina de login")
        this.navigate.navigate(['/login'])
      }
    });
  }
}
