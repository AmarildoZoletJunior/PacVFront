import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { LoginPageComponent } from './login-page/login-page.component';
import { ComponentsModule } from '../components/components.module';
import { SigninPageComponent } from './signin-page/signin-page.component';
import { ContatoComponent } from './contato/contato.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app-routing.module';
import { AcomodacoesComponent } from './acomodacoes/acomodacoes.component';
import { QuartoComponent } from './quarto/quarto.component';
import { MenuAdministradorListaComponent } from './menu-administrador-lista/menu-administrador-lista.component';
import { EditarQuartoComponent } from './editar-quarto/editar-quarto.component';
import { CriarQuartoComponent } from './criar-quarto/criar-quarto.component';
import { InformacaoUsuarioComponent } from './informacao-usuario/informacao-usuario.component';
import { ListaReservasComponent } from './lista-reservas/lista-reservas.component';
import { PagamentoComponent } from './pagamento/pagamento.component';
import { ReservaInformacaoComponent } from './reserva-informacao/reserva-informacao.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SobreComponent } from './sobre/sobre.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { CookieService } from 'ngx-cookie-service';
import { ListaReservasAdminComponent } from './lista-reservas-admin/lista-reservas-admin.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    SigninPageComponent,
    ContatoComponent,
    RecuperarSenhaComponent,
    LoginPageComponent,
    AcomodacoesComponent,
    QuartoComponent,
    MenuAdministradorListaComponent,
    EditarQuartoComponent,
    CriarQuartoComponent,
    InformacaoUsuarioComponent,
    ListaReservasComponent,
    PagamentoComponent,
    ReservaInformacaoComponent,
    HomePageComponent,
    SobreComponent,
    LoginAdminComponent,
    ListaReservasAdminComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BsDatepickerModule
  ],
  exports:[
    LoginPageComponent,
    SigninPageComponent,
    ContatoComponent,
    RecuperarSenhaComponent,
    LoginPageComponent
  ],
  providers: [CookieService,DatePipe]
})
export class PagesModule { }
