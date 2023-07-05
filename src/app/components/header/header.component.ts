import { Component,OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(
    private cookieService: CookieService){
    this.idUser = Number(this.cookieService.get("idUser")) || 0
  }
  idUser!:number
  ngOnInit(): void {
    this.idUser = Number(this.cookieService.get("idUser")) || 0
  }

  ResetarTudo(){
    this.cookieService.deleteAll()
  }
}
