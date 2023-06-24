import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RoomResponse } from 'src/app/services/Interfaces/room-response';
import { RoomService } from 'src/app/services/Services/Room/Servico/room.service';

@Component({
  selector: 'app-editar-quarto',
  templateUrl: './editar-quarto.component.html',
  styleUrls: ['./editar-quarto.component.css'],
})
export class EditarQuartoComponent implements OnInit {
  formulario!: FormGroup;
  idRoute!: number;
  RoomData!: RoomResponse;
  RoomDataAntigo!: RoomResponse;
  
  ImagemPrincipal: string = '';
  DemaisImagens: string = '';

  constructor(private room: RoomService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idRoute = Number(this.route.snapshot.paramMap.get('id'));
    this.room.GetRoomByIdWithImage(this.idRoute).subscribe((x) => {
      this.RoomDataAntigo = x;
      this.RoomData = x;
      this.formulario = new FormGroup({
        andar: new FormControl(this.RoomData ? this.RoomData.level : '', [
          Validators.required,
          Validators.minLength(3),
        ]),
        nome: new FormControl(this.RoomData ? this.RoomData.name : '', [
          Validators.required,
          Validators.minLength(3),
        ]),
        descricao: new FormControl(
          this.RoomData ? this.RoomData.description : '',
          [Validators.required, Validators.minLength(3)]
        ),
        numero: new FormControl(this.RoomData ? this.RoomData.number : '', [
          Validators.required,
          Validators.minLength(3),
        ]),
      });
    });
  }

  ArquivoImagemPrincipalNome(event: any) {
    const file = event.target.files[0];
    this.ImagemPrincipal = file ? file.name : '';
  }

  ModificarPropriedade(): Boolean {
    let roomDataResponse: RoomResponse = {
      id: this.RoomData.id,
      available: this.RoomData.available,
      level: Number(this.formulario.get('andar')?.value),
      name: this.formulario.get('nome')?.value,
      description: this.formulario.get('descricao')?.value,
      number: this.formulario.get('numero')?.value,
    };
    console.log(this.ImagemPrincipal.length)

    if (roomDataResponse.description == this.RoomDataAntigo.description && roomDataResponse.level == this.RoomDataAntigo.level && roomDataResponse.name == this.RoomDataAntigo.name && roomDataResponse.number == this.RoomDataAntigo.number && this.ImagemPrincipal.length == 0) {
      return false;
    }
    return true;
  }
}
