import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AuthService } from 'src/app/services/Services/Auth/Service/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  errorMessage: string = ''
  maxTentativas = 5;
  tentativas = 0;
  bloqueado = false;
  private assinaturaContagemRegressiva: Subscription | undefined;
  contagemRegressiva = 30;
  mensagemBloqueado = false;

  formulario!: FormGroup;

  ngOnInit(): void {
    this.cookieService.deleteAll()
    this.formulario = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$")]),
    })
  }
  
  constructor(private authService: AuthService,private router:Router,private cookieService: CookieService) { 
    this.cookieService.deleteAll()
  }

  iniciarContagem() {
    this.assinaturaContagemRegressiva = interval(1000)
      .pipe(take(this.contagemRegressiva))
      .subscribe({
        next: () => {
          this.contagemRegressiva--;
        },
        complete: () => {
          this.resetarContagem();
        },
      });
  }

  resetarContagem() {
    this.tentativas = 0;
    this.bloqueado = false;
    this.contagemRegressiva = 30;
    this.mensagemBloqueado = false;
    if (this.assinaturaContagemRegressiva) {
      this.assinaturaContagemRegressiva.unsubscribe();
    }
  }

  enviarDados() {
    if (this.bloqueado) {
      this.mensagemBloqueado = true;
      return;
    }
    if (this.formulario.valid) {
      this.errorMessage = ''
      this.authService.AuthClient(this.formulario.value).subscribe(x => {
        this.cookieService.deleteAll()
        this.cookieService.set("ClientName",String(x.clientName))
        this.cookieService.set("idUser", String(x.clientId))
        this.cookieService.set("keyToken", x.token)
        this.authService.estaLogado = true
        this.router.navigate(['/homepage'])
      }, (error) => {
        if (error instanceof HttpErrorResponse) {    
          if (error.error && Array.isArray(error.error) && error.error.length > 0) {
            for (let i = 0; i < error.error.length; i++) {
              const element = error.error[i];
              this.errorMessage += `ERRO: ${element.title}:  ${element.message}\n`;
            }
          }
          if (error.status == 401) {
            this.formulario.setValue({ email: this.formulario.value['email'], password: '' })
            this.tentativas++;
            this.errorMessage = "Usuario ou Senha invalidos !"
            if (this.tentativas >= this.maxTentativas) {
              this.bloqueado = true;
              this.iniciarContagem();
            }
          }
        }
      })
    }
  }
