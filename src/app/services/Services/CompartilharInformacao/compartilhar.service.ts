import { Injectable } from '@angular/core';
import { format } from 'date-fns';


@Injectable({
  providedIn: 'root'
})
export class CompartilharService {
  dataInicio!:Date
  dataFinal!:Date
  numerosDias!:number
  idQuarto!:number
  constructor() { }

  PegarInformacaoData(inicio:Date,final:Date,totalDia:number,idQuarto:number){
    this.dataFinal = final
    this.dataInicio = inicio
    this.numerosDias = totalDia 
    this.idQuarto = idQuarto
  }
  
  enviarInformacao(){
    return [this.dataInicio,this.dataFinal,this.numerosDias,this.numerosDias * 50,this.idQuarto]
  }
  
}
