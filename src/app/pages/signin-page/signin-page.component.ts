import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { concatWith } from 'rxjs';
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
      nome: new FormControl('',[Validators.required,Validators.minLength(2)]),
      sobrenome: new FormControl('',[Validators.required,Validators.minLength(2)]),
      telefone: new FormControl('',[Validators.required,Validators.pattern("\d+"),Validators.maxLength(11)]),
      cpf: new FormControl('',[Validators.required,Validators.pattern("\d+"),Validators.maxLength(11)]),
      email: new FormControl('',[Validators.required,Validators.email]),
      senha: new FormControl('',[Validators.required,Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$")]),
      confirmarsenha: new FormControl('',[Validators.required])
    },
    {
      validators: this.compararSenhas
    })
  }

  compararSenhas: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const campo1Control = formGroup.get('senha')?.value;
    const campo2Control = formGroup.get('confirmarsenha')?.value;

    if (campo1Control === null || campo2Control === null) {
      return null;
    }
    if (campo1Control !== campo2Control) {
      return { compareFields: true };
    }
    return null
  }

   constructor(private authService:AuthService){}


    enviarDados(){
      console.log("não")
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
