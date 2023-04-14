import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports:[
    LoginPageComponent
  ]
})
export class PagesModule { }
