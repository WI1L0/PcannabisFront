import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearnoticiaComponent } from './crearnoticia.component';

describe('CrearnoticiaComponent', () => {
  let component: CrearnoticiaComponent;
  let fixture: ComponentFixture<CrearnoticiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearnoticiaComponent]
    });
    fixture = TestBed.createComponent(CrearnoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
