import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/Services/Client/client.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit{
  formulario!:FormGroup;
  errorMessage: string = ''
  ngOnInit(): void {
    this.formulario = new FormGroup({
      password: new FormControl('',[Validators.required,Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$")]),
      confirmPassword: new FormControl('',[Validators.required,Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$")])
    },
    {
      validators: this.compararSenhas
    })
  }

  compararSenhas: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {
    const campo1Control = formGroup.get('password')?.value;
    const campo2Control = formGroup.get('confirmPassword')?.value;

    if (campo1Control === null || campo2Control === null) {
      return null;
    }
    if (campo1Control !== campo2Control) {
      return { compareFields: true };
    }
    return null
  }
constructor(private clientService:ClientService,private router:Router){}
  enviarDados(){
    this.errorMessage = ''
    const campo1Control = this.formulario.get('password')?.value;
    const campo2Control = this.formulario.get('confirmPassword')?.value;
console.log(campo1Control,campo2Control)
    if(this.formulario.valid){
      this.clientService.ModifyPassword({"id":1,"password":this.formulario.get('password')?.value}).subscribe(x => 
        {
          console.log(x)
        },(error)=>
        {
          if (error instanceof HttpErrorResponse) {
            if(error.status == 401){
              localStorage.clear()
              window.confirm("Infelizmente, ocorreu um erro de validação do seu usuário e você esta sendo redirecionado para a página de login.")
              this.router.navigate(['/login'])
              return
            }
            if (error.error && Array.isArray(error.error) && error.error.length > 0) {
              for (let i = 0; i < error.error.length; i++) {
                const element = error.error[i];
                this.errorMessage += `ERRO: ${element.title}:  ${element.message}\n`;
              }
            }
          }
        });
    }
  }

}
