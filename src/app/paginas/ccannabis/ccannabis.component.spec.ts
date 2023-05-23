import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CcannabisComponent } from './ccannabis.component';

describe('CcannabisComponent', () => {
  let component: CcannabisComponent;
  let fixture: ComponentFixture<CcannabisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CcannabisComponent]
    });
    fixture = TestBed.createComponent(CcannabisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
