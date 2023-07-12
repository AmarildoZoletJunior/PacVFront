import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CookieService } from 'ngx-cookie-service';
import { windowCount } from 'rxjs';
import { RoomResponse } from 'src/app/services/Interfaces/room-response';
import { RoomResponseWithImage } from 'src/app/services/Interfaces/room-with-images';
import { AluguelService } from 'src/app/services/Services/Aluguel/aluguel.service';
import { CompartilharService } from 'src/app/services/Services/CompartilharInformacao/compartilhar.service';
import { RoomService } from 'src/app/services/Services/Room/Servico/room.service';

@Component({
  selector: 'app-menu-administrador-lista',
  templateUrl: './menu-administrador-lista.component.html',
  styleUrls: ['./menu-administrador-lista.component.css'],
})
export class MenuAdministradorListaComponent implements OnInit {
  ListRooms!: Array<RoomResponse>;
  idRoute!: string | null;
  listaDatas: Date[] = [];
  startDate!: any;
  Today: Date = new Date();
  ErroData: boolean = false;
  dataValida: boolean = true;
  idUsuario!: number;
  selectedDate!: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(
    private roomService: RoomService,
    private aluguel: AluguelService,
    private cookieService:CookieService
  ) {
    this.Today.setDate(this.Today.getDate() + 1);
    this.datePickerConfig = Object.assign(
      {},
      {
        containerClass: 'theme-default',
        showWeekNumbers: false,
      }
    );
  }
  ngOnInit(): void {
    this.roomService.GetRooms().subscribe((x) => {
      this.ListRooms = x;
      console.log(x);
    });
  }

  DeletarQuarto(id: number, nomeQuarto: string) {
    let decisao = window.confirm(
      'Você deseja realmente deletar o quarto ' +
        nomeQuarto +
        ' que contém o id ' +
        id
    );
    if (decisao) {
      this.roomService.DeleteById(id).subscribe((x) => {
        if (x.status == HttpStatusCode.NoContent) {
          location.reload();
          window.confirm('Deletado com sucesso');
        } else {
          window.confirm('Ocorreu um erro, tente novamente');
        }
      });
    }
  }

  DesativarOuAtivarQuarto(id: number) {
    this.roomService.ActiveOrDesactiveRoom(id).subscribe(
      (x) => {
        window.confirm('A ação foi executada com sucesso');
        location.reload();
      },
      (error) => {
        window.confirm('Ocorreu um erro, tento novamente');
      }
    );
  }

  onDateChange() {
    for (let data of this.listaDatas) {
      let dataAtual = new Date();
      dataAtual.setDate(dataAtual.getDate() + 1);

      if (
        new Date(data) >= new Date(this.startDate[0]) &&
        new Date(data) <= new Date(this.startDate[1]) &&
        dataAtual < new Date(this.startDate[0]) &&
        dataAtual < new Date(this.startDate[1])
      ) {
        this.dataValida = true;
        this.startDate = undefined
        setTimeout(() => {
          this.ErroData = true;
        }, 50);
      }
    }
    this.dataValida = false;
    setTimeout(() => {
      this.ErroData = false;
    }, 5000);
  }

  carregarDatas(id: number) {
    this.listaDatas = [];

    this.aluguel.listDates(id).subscribe(
      (datas) => {
        datas.forEach((x) => {
          var dataAtual = new Date(x.split('T')[0]);
          dataAtual.setDate(dataAtual.getDate() + 1);
          this.listaDatas.push(dataAtual);
        });
      },
      (error) => {
        console.log('Sem datas');
      }
    );
  }

  confirmarReserva(id:number) {
    if(this.startDate == undefined){
      setTimeout(() => {
        this.ErroData = false
      }, 5000);
      this.ErroData = true
      return
    }
    let AluguelQuartoRequest = {
      "start": this.startDate[0],
      "end": this.startDate[1],
      "roomId": id,
      "clientId": Number(this.cookieService.get("idUser"))
    }
    this.aluguel.postBooking(AluguelQuartoRequest).subscribe(x => {
      window.confirm("Aluguel feito com sucesso.")
      this.startDate = undefined
    })
  }
}
