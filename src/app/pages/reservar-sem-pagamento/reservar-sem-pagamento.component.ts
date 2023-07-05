import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CookieService } from 'ngx-cookie-service';
import { RoomResponseWithImage } from 'src/app/services/Interfaces/room-with-images';
import { AluguelService } from 'src/app/services/Services/Aluguel/aluguel.service';
import { CompartilharService } from 'src/app/services/Services/CompartilharInformacao/compartilhar.service';
import { RoomService } from 'src/app/services/Services/Room/Servico/room.service';

@Component({
  selector: 'app-reservar-sem-pagamento',
  templateUrl: './reservar-sem-pagamento.component.html',
  styleUrls: ['./reservar-sem-pagamento.component.css']
})
export class ReservarSemPagamentoComponent {
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
      console.log("Caiu no true")
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


}
