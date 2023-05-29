import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { RoomResponseWithImage } from 'src/app/services/Interfaces/room-with-images';
import { RoomService } from 'src/app/services/Services/Room/Servico/room.service';

@Component({
  selector: 'app-quarto',
  templateUrl: './quarto.component.html',
  styleUrls: ['./quarto.component.css']
})
export class QuartoComponent implements OnInit{
  room: RoomResponseWithImage | undefined;
  idRoute!:string | null;

  constructor(private roomService:RoomService,private route:ActivatedRoute){}
  
  ngOnInit(): void {
    this.idRoute = this.route.snapshot.paramMap.get("id")
    this.roomService.GetRoomByIdWithImage(Number(this.idRoute)).subscribe(x =>{
      this.room = x
      console.log(x.images)
      console.log(x)
    },(error)=>{
      console.log(error)
    })

  }

}
