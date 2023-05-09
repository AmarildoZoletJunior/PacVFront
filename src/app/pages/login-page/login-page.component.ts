import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/Auth/Service/Request/auth.service';
import { ClientResponse } from 'src/app/services/Client/Interface/client-response';
import { ClientService } from 'src/app/services/Client/Service/client.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  formulario!:FormGroup;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required])
    })
  }

   constructor(private authService:AuthService){}


    enviarDados(){
      if(this.formulario.valid){
        console.log(this.formulario.value)
        this.authService.AuthClient(this.formulario.value).subscribe(x => {
          localStorage.setItem("keyToken",x.token);
          localStorage.setItem("idUser",String(x.clientId));
        },(error)=>{
          console.log(error)
        })
      }
      console.log("Ok")
    }
}
