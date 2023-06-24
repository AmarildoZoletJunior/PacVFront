import { Component,OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(){
    this.idUser = Number(localStorage.getItem("idUser")) || 0
  }
  idUser!:number
  ngOnInit(): void {
    this.idUser = Number(localStorage.getItem("idUser")) || 0
  }
}
