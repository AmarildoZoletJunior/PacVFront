import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { ComponentsModule } from '../components/components.module';
import { SigninPageComponent } from './signin-page/signin-page.component';



@NgModule({
  declarations: [
    LoginPageComponent,
    SigninPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports:[
    LoginPageComponent,
    SigninPageComponent
  ]
})
export class PagesModule { }
