import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/Auth/Service/Request/auth.service';
import { ClientService } from 'src/app/services/Client/Service/client.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(private authService:AuthService,private client:ClientService){}

  public click(){
    this.client.GetClientById(1).subscribe(x => console.log(x));
  }
}
