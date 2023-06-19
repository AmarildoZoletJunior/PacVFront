import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SigninPageComponent } from './pages/signin-page/signin-page.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { AreaDoClienteComponent } from './pages/area-do-cliente/area-do-cliente.component';
import { AcomodacoesComponent } from './pages/acomodacoes/acomodacoes.component';
import { MessageErrorComponent } from './components/message-error/message-error.component';
import { QuartoComponent } from './pages/quarto/quarto.component';
import { MenuAdministradorListaComponent } from './pages/menu-administrador-lista/menu-administrador-lista.component';
import { EditarQuartoComponent } from './pages/editar-quarto/editar-quarto.component';
import { CriarQuartoComponent } from './pages/criar-quarto/criar-quarto.component';
import { InformacaoUsuarioComponent } from './pages/informacao-usuario/informacao-usuario.component';
import { ListaReservasComponent } from './pages/lista-reservas/lista-reservas.component';
import { PagamentoComponent } from './pages/pagamento/pagamento.component';
import { SobreComponent } from './pages/sobre/sobre.component';
import { ReservaInformacaoComponent } from './pages/reserva-informacao/reserva-informacao.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthService } from './services/Services/Auth/Service/auth.service';

const routes: Routes = [
  {path:'signin', component:SigninPageComponent},
  {path:'recuperacao', component:RecuperarSenhaComponent},
  {path:'contato', component:ContatoComponent},
  {path:'areacliente', component:AreaDoClienteComponent},
  {path:'login',component:LoginPageComponent},
  {path:'acomodacoes',component:AcomodacoesComponent},
  {path:'quarto/:id', component:QuartoComponent},
  {path:'administrador',component:MenuAdministradorListaComponent,canActivate:[AuthService]},
  {path:'editar/quarto/:id',component:EditarQuartoComponent,canActivate:[AuthService]},
  {path:'criar',component:CriarQuartoComponent,canActivate:[AuthService]},
  {path:'editar/usuario',component:InformacaoUsuarioComponent,canActivate:[AuthService]},
  {path:'reservas',component:ListaReservasComponent,canActivate:[AuthService]},
  {path:'pagamento',component:PagamentoComponent,canActivate:[AuthService]},
  {path:'sobre',component:SobreComponent},
  {path:'reserva/:id',component:ReservaInformacaoComponent,canActivate:[AuthService]},
  {path:'homepage',component:HomePageComponent},
  {path:'reservas',component:ListaReservasComponent},
  {path:'**',component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
