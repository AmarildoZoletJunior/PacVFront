import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { AreaDoClienteComponent } from './pages/area-do-cliente/area-do-cliente.component';
import { ComponentsModule } from './components/components.module';



const routes : Routes = [
  {path: '', component:LoginPageComponent},
  {path: 'signin', component:SigninPageComponent},
  {path: 'recuperar-senha', component:RecuperarSenhaComponent},
  {path: 'contato', component:ContatoComponent},
  {path: 'area-cliente', component:AreaDoClienteComponent},
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    RouterModule.forRoot(routes),
    ComponentsModule
  ],
  exports:[RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
