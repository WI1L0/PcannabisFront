import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlNoticiasComponent } from './control-noticias.component';

describe('ControlNoticiasComponent', () => {
  let component: ControlNoticiasComponent;
  let fixture: ComponentFixture<ControlNoticiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlNoticiasComponent]
    });
    fixture = TestBed.createComponent(ControlNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
