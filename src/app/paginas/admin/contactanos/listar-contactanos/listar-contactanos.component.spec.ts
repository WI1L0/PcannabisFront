import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarContactanosComponent } from './listar-contactanos.component';

describe('ListarContactanosComponent', () => {
  let component: ListarContactanosComponent;
  let fixture: ComponentFixture<ListarContactanosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListarContactanosComponent]
    });
    fixture = TestBed.createComponent(ListarContactanosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
