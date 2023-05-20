import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaInformacaoComponent } from './reserva-informacao.component';

describe('ReservaInformacaoComponent', () => {
  let component: ReservaInformacaoComponent;
  let fixture: ComponentFixture<ReservaInformacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaInformacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservaInformacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
