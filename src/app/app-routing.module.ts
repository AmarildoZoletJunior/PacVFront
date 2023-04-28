import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { AreaDoClienteComponent } from './pages/area-do-cliente/area-do-cliente.component';

const routes: Routes = [
  {path: 'home', component:LoginPageComponent},
  {path: 'signin', component:SigninPageComponent},
  {path: 'recuperacao', component:RecuperarSenhaComponent},
  {path: 'contato', component:ContatoComponent},
  {path: 'areacliente', component:AreaDoClienteComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
