import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionusuariosComponent } from './gestionusuarios.component';

describe('GestionusuariosComponent', () => {
  let component: GestionusuariosComponent;
  let fixture: ComponentFixture<GestionusuariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionusuariosComponent]
    });
    fixture = TestBed.createComponent(GestionusuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
