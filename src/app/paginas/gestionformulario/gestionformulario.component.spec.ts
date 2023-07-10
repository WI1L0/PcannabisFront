import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionformularioComponent } from './gestionformulario.component';

describe('GestionformularioComponent', () => {
  let component: GestionformularioComponent;
  let fixture: ComponentFixture<GestionformularioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionformularioComponent]
    });
    fixture = TestBed.createComponent(GestionformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
