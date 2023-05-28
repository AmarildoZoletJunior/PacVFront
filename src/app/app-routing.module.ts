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
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {path:'home', component:LoginPageComponent},
  {path:'signin', component:SigninPageComponent},
  {path:'recuperacao', component:RecuperarSenhaComponent},
  {path:'contato', component:ContatoComponent},
  {path:'areacliente', component:AreaDoClienteComponent},
  {path:'login',component:LoginPageComponent},
  {path:'acomodacoes',component:AcomodacoesComponent},
  {path:'quarto/:id', component:QuartoComponent},
  {path:'administrador',component:MenuAdministradorListaComponent},
  {path:'editar/quarto/:id',component:EditarQuartoComponent},
  {path:'criar',component:CriarQuartoComponent},
  {path:'editar/usuario',component:InformacaoUsuarioComponent},
  {path:'reservas',component:ListaReservasComponent},
  {path:'pagamento',component:PagamentoComponent},
  {path:'homepage',component:HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
