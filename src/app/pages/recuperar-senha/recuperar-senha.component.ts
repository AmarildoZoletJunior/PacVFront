import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit{
  formulario!:FormGroup;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      novasenha: new FormControl('',[Validators.required,Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$")]),
      confirmarsenha: new FormControl('',[Validators.required,Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$")])
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

}
