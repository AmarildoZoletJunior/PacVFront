import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RoomResponse } from 'src/app/services/Interfaces/room-response';
import { RoomService } from 'src/app/services/Services/Room/Servico/room.service';

@Component({
  selector: 'app-menu-administrador-lista',
  templateUrl: './menu-administrador-lista.component.html',
  styleUrls: ['./menu-administrador-lista.component.css']
})
export class MenuAdministradorListaComponent implements OnInit {
  ListRooms!:Array<RoomResponse>
  constructor(private roomService:RoomService){}
    ngOnInit(): void {
      this.roomService.GetRooms().subscribe(x =>{
        this.ListRooms = x
        console.log(x)
      } );
    }

    DeletarUsuario(id:number,nomeQuarto:string){
      let decisao = window.confirm("Você deseja realmente deletar o quarto " + nomeQuarto + " que contém o id " + id)
      if(decisao){
        this.roomService.DeleteById(id).subscribe(x =>{
          if(x.status == HttpStatusCode.NoContent){
              window.confirm("Deletado com sucesso")
          }else{
            window.confirm("Ocorreu um erro, tente novamente")
          }
        })
      }

    }
}
