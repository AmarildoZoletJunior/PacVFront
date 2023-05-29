import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/Services/Auth/Service/auth.service';

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
      password: new FormControl('',[Validators.required,Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$")]),
    })
  }

   constructor(private authService:AuthService){}


    enviarDados(){
      if(this.formulario.valid){
        this.authService.AuthClient(this.formulario.value).subscribe(x => {
          localStorage.setItem("keyToken",x.token);
          localStorage.setItem("idUser",String(x.clientId));
        },(error)=>{
          if(error instanceof HttpErrorResponse)
          {
              if(error.status == 401)
              {
                console.clear();
                this.formulario.setValue({email:this.formulario.value['email'],password:''})
              }
          }
        })
      }
    }
}
