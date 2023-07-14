import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleContactanosComponent } from './detalle-contactanos.component';

describe('DetalleContactanosComponent', () => {
  let component: DetalleContactanosComponent;
  let fixture: ComponentFixture<DetalleContactanosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleContactanosComponent]
    });
    fixture = TestBed.createComponent(DetalleContactanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
