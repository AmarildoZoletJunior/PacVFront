import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { RoomResponseWithImage } from 'src/app/services/Interfaces/room-with-images';
import { RoomService } from 'src/app/services/Services/Room/Servico/room.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { format } from 'date-fns';
import { AluguelService } from 'src/app/services/Services/Aluguel/aluguel.service';
import { DatePipe } from '@angular/common';
import { CompartilharService } from 'src/app/services/Services/CompartilharInformacao/compartilhar.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-quarto',
  templateUrl: './quarto.component.html',
  styleUrls: ['./quarto.component.css']
})

export class QuartoComponent implements OnInit{
  room: RoomResponseWithImage | undefined;
  idRoute!:string | null;
  listaDatas:Date[] = []
  startDate!: any;
  Today:Date = new Date()
  ErroData:boolean = false
  dataValida:boolean = true
  idUsuario!:number;
  selectedDate!: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(
    private cookieService: CookieService,private navegacao:Router,private roomService:RoomService,private route:ActivatedRoute,private aluguel:AluguelService,private compartilharInformacao:CompartilharService) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-default',
      showWeekNumbers: false
    });
  }
  ngOnInit(): void {
    this.idUsuario = Number(this.cookieService.get("idUser")) || 0
    this.Today.setDate(this.Today.getDate() + 9)
    this.idRoute = this.route.snapshot.paramMap.get("id")
    this.roomService.GetRoomByIdWithImage(Number(this.idRoute)).subscribe(x =>{
      this.room = x
      console.log(x.images)
    },(error)=>{
      this.navegacao.navigate(['/acomodacoes'])
    })
  }

  carregarDatas(){
    this.aluguel.listDates(Number(this.route.snapshot.paramMap.get('id'))).subscribe(datas =>
      {
        console.log("caiu aqui")
        datas.forEach(x =>{
          console.log(x)
          var dataAtual = new Date(x.split("T")[0]);
          dataAtual.setDate(dataAtual.getDate() + 1)
          this.listaDatas.push(dataAtual)
        })
      },(error)=>{
        console.log("Sem datas")
      });
  }

  onDateChange() {
    this.ErroData = false
    for(let data of this.listaDatas)
    { 
      let dataAtual = new Date()
      dataAtual.setDate(dataAtual.getDate() + 9)
     if((new Date(data) >= new Date(this.startDate[0]) && new Date(data) <= new Date(this.startDate[1])) && dataAtual < new Date(this.startDate[0]) && dataAtual < new Date(this.startDate[1]))
     {
      setTimeout(() => {
        this.ErroData = false
        return
      }, 5000);
      this.ErroData = true
      this.dataValida = true
      this.startDate = undefined
     }
    }
    this.dataValida = false
  }

  enviarParaPagamento(){
    if(this.startDate == undefined){
      setTimeout(() => {
        this.ErroData = false
      }, 5000);
      this.ErroData = true
      return
    }

    let inicioData = new Date(this.startDate[0])
    let finalData = new Date(this.startDate[1])
    let diffInMs = finalData.getTime() - inicioData.getTime()
    let diffInDays = (diffInMs / (1000 * 60 * 60 * 24)) + 1;
    if(this.ErroData == false){
      this.compartilharInformacao.PegarInformacaoData(inicioData,finalData,diffInDays,Number(this.idRoute),)
      this.navegacao.navigate(['/pagamento'])
    }
  }
}
