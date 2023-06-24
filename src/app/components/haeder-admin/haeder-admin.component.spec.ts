import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaederAdminComponent } from './haeder-admin.component';

describe('HaederAdminComponent', () => {
  let component: HaederAdminComponent;
  let fixture: ComponentFixture<HaederAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HaederAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HaederAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
