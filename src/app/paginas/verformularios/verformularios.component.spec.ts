import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerformulariosComponent } from './verformularios.component';

describe('VerformulariosComponent', () => {
  let component: VerformulariosComponent;
  let fixture: ComponentFixture<VerformulariosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerformulariosComponent]
    });
    fixture = TestBed.createComponent(VerformulariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
