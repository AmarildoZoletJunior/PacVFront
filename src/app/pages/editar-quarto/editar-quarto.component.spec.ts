import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarQuartoComponent } from './editar-quarto.component';

describe('EditarQuartoComponent', () => {
  let component: EditarQuartoComponent;
  let fixture: ComponentFixture<EditarQuartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarQuartoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarQuartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
