import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-termo-consentimento',
  templateUrl: './termo-consentimento.component.html',
  styleUrls: ['./termo-consentimento.component.css']
})

export class TermoConsentimentoComponent {
  nome!: string;
  cpf!: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nome = params['nome'];
      this.cpf = params['cpf'];
    });
  }
  
}
