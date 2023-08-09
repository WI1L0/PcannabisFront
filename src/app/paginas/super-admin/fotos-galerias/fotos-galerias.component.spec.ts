import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotosGaleriasComponent } from './fotos-galerias.component';

describe('FotosGaleriasComponent', () => {
  let component: FotosGaleriasComponent;
  let fixture: ComponentFixture<FotosGaleriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FotosGaleriasComponent]
    });
    fixture = TestBed.createComponent(FotosGaleriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
