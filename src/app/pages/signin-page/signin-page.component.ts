import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/Services/Client/client.service';


@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css']
})
export class SigninPageComponent {
  errorMessage: string = ''
  formulario!: FormGroup;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      surname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]{11}"), Validators.maxLength(11)]),
      documentNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}"), Validators.maxLength(14)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$")]),
      confirmarsenha: new FormControl('', [Validators.required])
    }),
    {
      validators: this.compararSenhas
    }
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

  constructor(private ClienteService: ClientService) { }


  enviarDados() {
    if (this.formulario.valid) {
      console.log(this.formulario.value)
      this.ClienteService.CreateClient(this.formulario.value).subscribe(x => {
        this.errorMessage = ''
        console.log(x)
      }, (error) => {
        if (error instanceof HttpErrorResponse) {
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