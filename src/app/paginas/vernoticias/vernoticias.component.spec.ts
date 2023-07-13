import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VernoticiasComponent } from './vernoticias.component';

describe('VernoticiasComponent', () => {
  let component: VernoticiasComponent;
  let fixture: ComponentFixture<VernoticiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VernoticiasComponent]
    });
    fixture = TestBed.createComponent(VernoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
