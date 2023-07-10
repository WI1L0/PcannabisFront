import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminprincipalComponent } from './adminprincipal.component';

describe('AdminprincipalComponent', () => {
  let component: AdminprincipalComponent;
  let fixture: ComponentFixture<AdminprincipalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminprincipalComponent]
    });
    fixture = TestBed.createComponent(AdminprincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
