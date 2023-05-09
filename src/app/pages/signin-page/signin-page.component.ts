import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/Auth/Service/Request/auth.service';
import { ClientService } from 'src/app/services/Client/Service/client.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent {

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
          console.log(x.token)
        },(error)=>{
          console.log(error)
        })
      }
      console.log("Ok")
    }
}
