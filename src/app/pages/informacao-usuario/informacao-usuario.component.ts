import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private client: ClientService) {}
  ngOnInit(): void {
    this.idRoute = localStorage.getItem("idUser")
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
