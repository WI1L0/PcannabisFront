import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipaladminComponent } from './principaladmin.component';

describe('PrincipaladminComponent', () => {
  let component: PrincipaladminComponent;
  let fixture: ComponentFixture<PrincipaladminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipaladminComponent]
    });
    fixture = TestBed.createComponent(PrincipaladminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
