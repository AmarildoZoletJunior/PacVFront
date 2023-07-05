import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaReservasAdminComponent } from './lista-reservas-admin.component';

describe('ListaReservasAdminComponent', () => {
  let component: ListaReservasAdminComponent;
  let fixture: ComponentFixture<ListaReservasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaReservasAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaReservasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
