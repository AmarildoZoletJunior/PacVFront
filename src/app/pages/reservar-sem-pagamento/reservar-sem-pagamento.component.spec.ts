import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservarSemPagamentoComponent } from './reservar-sem-pagamento.component';

describe('ReservarSemPagamentoComponent', () => {
  let component: ReservarSemPagamentoComponent;
  let fixture: ComponentFixture<ReservarSemPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservarSemPagamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservarSemPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
