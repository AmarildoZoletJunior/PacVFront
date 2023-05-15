import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAdministradorListaComponent } from './menu-administrador-lista.component';

describe('MenuAdministradorListaComponent', () => {
  let component: MenuAdministradorListaComponent;
  let fixture: ComponentFixture<MenuAdministradorListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAdministradorListaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuAdministradorListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
