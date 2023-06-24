import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { AluguelQuartoResponse } from 'src/app/services/Interfaces/AluguelQuarto-response';
import { AluguelService } from 'src/app/services/Services/Aluguel/aluguel.service';

@Component({
  selector: 'app-lista-reservas',
  templateUrl: './lista-reservas.component.html',
  styleUrls: ['./lista-reservas.component.css']
})
export class ListaReservasComponent implements OnInit{
  listaAluguel!:Array<AluguelQuartoResponse>
  idUsuario!:number
constructor(private AluguelService:AluguelService,private route:Router){}
  ngOnInit(): void {
    this.idUsuario = Number(localStorage.getItem("idUser")) || 0
    console.log("Teste")
    this.AluguelService.getBookingsForClientId(this.idUsuario).subscribe(x =>{
      x.forEach(aluguel =>{
        let teste = new Date(aluguel.start.split("T")[0])
        aluguel.start = format(new Date(aluguel.start.split("T")[0]),'dd/MM/yyyy')
        aluguel.end = format(new Date(aluguel.end.split("T")[0]),'dd/MM/yyyy')
      })
      this.listaAluguel = x
      
    },(error)=>{
      if(error instanceof HttpErrorResponse){

      }
    })
  }
  
}
