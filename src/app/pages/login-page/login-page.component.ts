import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
 
import { AuthService } from 'src/app/services/Auth/Service/Request/auth.service';
import { ClientResponse } from 'src/app/services/Client/Interface/client-response';
import { ClientService } from 'src/app/services/Client/Service/client.service';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
 
import { AuthService } from 'src/app/services/Services/Auth/Service/auth.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
 
  maxAttempts = 5;
  attemptCount = 0;
  isBlocked = false;
  private countdownSubscription: Subscription | undefined;
  countdownSeconds = 30;
  showBlockedMessage = false;
  formulario!: FormGroup;

  ngOnInit(): void {
    this.formulario = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.pattern("^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$")]),
    })
  }

  constructor(private authService: AuthService) { }

  startCountdown() {
    this.countdownSubscription = interval(1000)
      .pipe(take(this.countdownSeconds))
      .subscribe({
        next: () => {
          this.countdownSeconds--;
        },
        complete: () => {
          this.resetCountdown();
        },
      });
  }

  resetCountdown() {
    this.attemptCount = 0;
    this.isBlocked = false;
    this.countdownSeconds = 30;
    this.showBlockedMessage = false;
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  enviarDados() {
    if (this.isBlocked) {
      this.showBlockedMessage = true; 
      return; 
    }
    if (this.formulario.valid) {
      console.log(this.formulario.value);
      this.authService.AuthClient(this.formulario.value).subscribe(
        (x) => {
          localStorage.setItem('keyToken', x.token);
          localStorage.setItem('idUser', String(x.clientId));
        },
        (error) => {
          console.log(error);
          this.attemptCount++;
          
          if (this.attemptCount >= this.maxAttempts) {
            this.isBlocked = true;
            this.startCountdown();
          }
        }
      );
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
    console.log('Ok');
  }
}
