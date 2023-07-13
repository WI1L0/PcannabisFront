import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarnotComponent } from './editarnot.component';

describe('EditarnotComponent', () => {
  let component: EditarnotComponent;
  let fixture: ComponentFixture<EditarnotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarnotComponent]
    });
    fixture = TestBed.createComponent(EditarnotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
