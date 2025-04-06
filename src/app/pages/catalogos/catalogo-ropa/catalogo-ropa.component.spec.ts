import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoRopaComponent } from './catalogo-ropa.component';

describe('CatalogoRopaComponent', () => {
  let component: CatalogoRopaComponent;
  let fixture: ComponentFixture<CatalogoRopaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoRopaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoRopaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
