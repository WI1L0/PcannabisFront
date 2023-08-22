import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderNunakayComponent } from './header-nunakay.component';

describe('HeaderNunakayComponent', () => {
  let component: HeaderNunakayComponent;
  let fixture: ComponentFixture<HeaderNunakayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderNunakayComponent]
    });
    fixture = TestBed.createComponent(HeaderNunakayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
