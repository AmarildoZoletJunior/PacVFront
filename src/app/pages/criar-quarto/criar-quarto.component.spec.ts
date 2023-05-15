import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarQuartoComponent } from './criar-quarto.component';

describe('CriarQuartoComponent', () => {
  let component: CriarQuartoComponent;
  let fixture: ComponentFixture<CriarQuartoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarQuartoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarQuartoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
