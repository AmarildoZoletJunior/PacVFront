import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermoConsentimentoComponent } from './termo-consentimento.component';

describe('TermoConsentimentoComponent', () => {
  let component: TermoConsentimentoComponent;
  let fixture: ComponentFixture<TermoConsentimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermoConsentimentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TermoConsentimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
