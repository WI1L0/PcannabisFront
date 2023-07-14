import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleNoticiasAdComponent } from './detalle-noticias-ad.component';

describe('DetalleNoticiasAdComponent', () => {
  let component: DetalleNoticiasAdComponent;
  let fixture: ComponentFixture<DetalleNoticiasAdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetalleNoticiasAdComponent]
    });
    fixture = TestBed.createComponent(DetalleNoticiasAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
