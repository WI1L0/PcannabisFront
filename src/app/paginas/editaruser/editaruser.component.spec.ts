import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaruserComponent } from './editaruser.component';

describe('EditaruserComponent', () => {
  let component: EditaruserComponent;
  let fixture: ComponentFixture<EditaruserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditaruserComponent]
    });
    fixture = TestBed.createComponent(EditaruserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
