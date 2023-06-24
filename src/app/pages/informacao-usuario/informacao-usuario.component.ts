import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ClienteRequestInfo } from 'src/app/services/Interfaces/client-request-Info';
import { ClientResponse } from 'src/app/services/Interfaces/client-response';
import { ClientService } from 'src/app/services/Services/Client/client.service';

@Component({
  selector: 'app-informacao-usuario',
  templateUrl: './informacao-usuario.component.html',
  styleUrls: ['./informacao-usuario.component.css'],
})
export class InformacaoUsuarioComponent implements OnInit {
  formulario!: FormGroup;
  idRoute!: string | null;
  UserData: ClientResponse | null = null;
  InputsMudou!: boolean;
  nomeAntigo!: string;
  sobrenomeAntigo!: string;

  constructor(private route: ActivatedRoute,private rota:Router, private client: ClientService,
    private cookieService: CookieService) {}
  ngOnInit(): void {
    this.idRoute = this.cookieService.get("idUser")
    console.log(this.idRoute);
    this.client.GetClientById(Number(this.idRoute)).subscribe((x) => {
      this.UserData = x;
      this.nomeAntigo = x.name;
      this.sobrenomeAntigo = x.surname;
      this.formulario = new FormGroup({
        nome: new FormControl(this.UserData ? this.UserData.name : '', [
          Validators.required,
          Validators.minLength(3),
        ]),
        sobrenome: new FormControl(this.UserData ? this.UserData.surname : '', [
          Validators.required,
          Validators.minLength(3),
        ]),
      });
    },(error)=>{
      if(error  instanceof HttpErrorResponse){
        if(error.status == 401){
          this.cookieService.deleteAll()
          window.confirm(
            'Infelizmente, ocorreu um erro de validação do seu usuário e você esta sendo redirecionado para a página de login.'
          );
          this.rota.navigate(['/login']);
        }
        //Fazer o tratamento de erro com o retorno da api
      }
    });
  }
  enviarDados() {
    if (this.formulario.valid) {
      let ClienteModificado:ClienteRequestInfo = 
      {
        "id":Number(this.idRoute),
        "name":this.formulario.get('nome')?.value,
        "surname":this.formulario.get('sobrenome')?.value,
      }
      this.client.ModifyInfo(ClienteModificado).subscribe((x) => {
        console.log('Passou');
      });
    }
  }

  MudarValor(): boolean {
    if (
      this.formulario.get('nome')?.value != this.nomeAntigo ||
      this.formulario.get('sobrenome')?.value != this.sobrenomeAntigo
    ) {
      return true;
    }
    return false;
  }
}
