import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AppRoutingModule } from '../app-routing.module';
import { MessageErrorComponent } from './message-error/message-error.component';
import { Base64ToImagePipe } from './pipes/Base64ToImagePipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MessageErrorComponent,
    Base64ToImagePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    MessageErrorComponent,
    Base64ToImagePipe
  ]
})
export class ComponentsModule { }
