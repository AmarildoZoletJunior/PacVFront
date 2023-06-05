import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { RoomResponseWithImage } from 'src/app/services/Interfaces/room-with-images';
import { RoomService } from 'src/app/services/Services/Room/Servico/room.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-quarto',
  templateUrl: './quarto.component.html',
  styleUrls: ['./quarto.component.css']
})
export class QuartoComponent implements OnInit{
  room: RoomResponseWithImage | undefined;
  idRoute!:string | null;

  disabledDates = [
    new Date('2020-02-05'),
    new Date('2020-02-09')
  ];

  selectedDate!: Date;
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(private roomService:RoomService,private route:ActivatedRoute) {
    this.datePickerConfig = Object.assign({}, {
      containerClass: 'theme-default',
      showWeekNumbers: false
    });
  }
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
