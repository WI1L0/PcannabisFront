import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNoticiasComponent } from './all-noticias.component';

describe('AllNoticiasComponent', () => {
  let component: AllNoticiasComponent;
  let fixture: ComponentFixture<AllNoticiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllNoticiasComponent]
    });
    fixture = TestBed.createComponent(AllNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
