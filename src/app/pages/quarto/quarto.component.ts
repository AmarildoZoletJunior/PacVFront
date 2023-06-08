import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { RoomResponseWithImage } from 'src/app/services/Interfaces/room-with-images';
import { RoomService } from 'src/app/services/Services/Room/Servico/room.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { format } from 'date-fns';
import { AluguelService } from 'src/app/services/Services/Aluguel/aluguel.service';
import { DatePipe } from '@angular/common';

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

  selectedDate!: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(private roomService:RoomService,private route:ActivatedRoute,private aluguel:AluguelService) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-default',
      showWeekNumbers: false
    });
  }
  ngOnInit(): void {
    this.Today.setDate(this.Today.getDate() + 3)
    this.idRoute = this.route.snapshot.paramMap.get("id")
    this.roomService.GetRoomByIdWithImage(Number(this.idRoute)).subscribe(x =>{
      this.room = x
      console.log(x.images)
      console.log(x)
    },(error)=>{
      console.log(error)
    })
  }

  carregarDatas(){
    this.aluguel.listDates(1).subscribe(datas =>
      {
        console.log(datas)
        datas.forEach(x =>{
          var dataAtual = new Date(x.split("T")[0]);
          dataAtual.setDate(dataAtual.getDate() + 1)
          this.listaDatas.push(dataAtual)
        })
      });
  }

  onDateChange() {
    for(let data in this.listaDatas)
    { 
      console.log(this.listaDatas)
      console.log(format(new Date(this.startDate[0]), 'dd/MM/yyyy') <= format(new Date(data.split("T")[0]), 'dd/MM/yyyy'))
      console.log(format(new Date(this.startDate[1]), 'dd/MM/yyyy') >= format(new Date(data.split("T")[0]),'dd/MM/yyyy'))
     if(format(new Date(this.startDate[0]), 'dd/MM/yyyy') <= format(new Date(data.split("T")[0]), 'dd/MM/yyyy') && format(new Date(data.split("T")[0]),'dd/MM/yyyy') <= format(new Date(this.startDate[1]), 'dd/MM/yyyy'))
     {
      this.ErroData = true
      setTimeout(() => {
        this.ErroData = false
      }, 5000);
     }
    }
    console.log('startDate: ' + format(new Date(this.startDate[0]), 'dd/MM/yyyy'))
    console.log('endDate: ' + format(new Date(this.startDate[1]), 'dd/MM/yyyy'))
    
  }
}
