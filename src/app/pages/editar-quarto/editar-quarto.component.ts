import { Component } from '@angular/core';

@Component({
  selector: 'app-editar-quarto',
  templateUrl: './editar-quarto.component.html',
  styleUrls: ['./editar-quarto.component.css']
})
export class EditarQuartoComponent {
  ImagemPrincipal: string = '';
  DemaisImagens: string = '';

  ArquivoImagemPrincipalNome(event: any) {
    const file = event.target.files[0];
    this.ImagemPrincipal = file ? file.name : '';
  }
  ArquivoImagensSecundarias(event: any) {
    const files = event.target.files;
    let arrayNomes= [];
    for (let i = 0; i < files.length; i++) {
      arrayNomes.push(files[i].name);
      if(i ==0){
        this.DemaisImagens = files[i].name
      }
      this.DemaisImagens += ", " + files[i].name;
    }
  }
}
