import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, interval, take } from 'rxjs';
import { AuthService } from 'src/app/services/Services/Auth/Service/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
})
export class LoginAdminComponent {
  errorMessage: string = '';
  maxTentativas = 5;
  tentativas = 0;
  bloqueado = false;
  private assinaturaContagemRegressiva: Subscription | undefined;
  contagemRegressiva = 30;
  mensagemBloqueado = false;

  formulario!: FormGroup;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$'
        ),
      ]),
    });
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {
    localStorage.clear();
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
      this.errorMessage = '';
      this.authService.AuthClient(this.formulario.value).subscribe(
        (x) => {
          if(x.isAdmin == false){
            window.confirm("Usuário não autorizado")
            this.formulario.setValue({
              email: '',
              password: '',
            });
            return
          }
          this.authService.estaLogado = true;
          this.cookieService.deleteAll();
          this.cookieService.set('ClientName', String(x.clientName));
          this.cookieService.set('idUser', String(x.clientId));
          this.cookieService.set('keyToken', x.token);
          this.router.navigate(['/administrador']);
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            if (
              error.error &&
              Array.isArray(error.error) &&
              error.error.length > 0
            ) {
              for (let i = 0; i < error.error.length; i++) {
                const element = error.error[i];
                this.errorMessage += `ERRO: ${element.title}:  ${element.message}\n`;
              }
            }
            if (error.status == 401) {
              this.formulario.setValue({
                email: this.formulario.value['email'],
                password: '',
              });
              this.tentativas++;
              this.errorMessage = 'Usuario ou Senha invalidos !';
              if (this.tentativas >= this.maxTentativas) {
                this.bloqueado = true;
                this.iniciarContagem();
              }
            }
          }
        }
      );
    }
  }
}
