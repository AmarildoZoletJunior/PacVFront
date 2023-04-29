import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/Service/Request/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private authService:AuthService){}

  public click(){
 const cliente:any ={
  "email":"amarildo@gmail.com",
  "password":"Junior"
  };
    this.authService.AuthClient(cliente).subscribe(x => localStorage.setItem("keyHash",x.token));
  }
}
