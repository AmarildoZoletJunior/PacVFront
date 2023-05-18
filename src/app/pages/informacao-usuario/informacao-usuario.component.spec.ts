import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacaoUsuarioComponent } from './informacao-usuario.component';

describe('InformacaoUsuarioComponent', () => {
  let component: InformacaoUsuarioComponent;
  let fixture: ComponentFixture<InformacaoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacaoUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacaoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
