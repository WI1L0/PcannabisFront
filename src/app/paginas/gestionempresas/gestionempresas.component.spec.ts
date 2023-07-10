import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionempresasComponent } from './gestionempresas.component';

describe('GestionempresasComponent', () => {
  let component: GestionempresasComponent;
  let fixture: ComponentFixture<GestionempresasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionempresasComponent]
    });
    fixture = TestBed.createComponent(GestionempresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
