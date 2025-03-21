import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoFloresComponent } from './catalogo-flores.component';

describe('CatalogoFloresComponent', () => {
  let component: CatalogoFloresComponent;
  let fixture: ComponentFixture<CatalogoFloresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoFloresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoFloresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
