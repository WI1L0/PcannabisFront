import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlotanteComponent } from './flotante.component';

describe('FlotanteComponent', () => {
  let component: FlotanteComponent;
  let fixture: ComponentFixture<FlotanteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlotanteComponent]
    });
    fixture = TestBed.createComponent(FlotanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
