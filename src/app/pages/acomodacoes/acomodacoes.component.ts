import { Component, OnInit } from '@angular/core';
import { RoomResponseWithImage } from 'src/app/services/Interfaces/room-with-images';
import { RoomService } from 'src/app/services/Services/Room/Servico/room.service';

@Component({
  selector: 'app-acomodacoes',
  templateUrl: './acomodacoes.component.html',
  styleUrls: ['./acomodacoes.component.css']
})
export class AcomodacoesComponent implements OnInit {
  ListRooms!:Array<RoomResponseWithImage>
constructor(private roomService:RoomService){}
  ngOnInit(): void {
    this.roomService.GetRoomsAvailable().subscribe(x => this.ListRooms = x);
    localStorage.setItem("add","olateste")
  }

  transform(base64: string): string {
    return `data:image/jpeg;base64,${base64}`;
  }


}
