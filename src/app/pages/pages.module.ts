import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { ComponentsModule } from '../components/components.module';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { ContatoComponent } from './contato/contato.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { AreaDoClienteComponent } from './area-do-cliente/area-do-cliente.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    SigninPageComponent,
    ContatoComponent,
    RecuperarSenhaComponent,
    LoginPageComponent,
    AreaDoClienteComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports:[
    LoginPageComponent,
    SigninPageComponent,
    ContatoComponent,
    RecuperarSenhaComponent,
    LoginPageComponent,
    AreaDoClienteComponent
  ]
})
export class PagesModule { }
