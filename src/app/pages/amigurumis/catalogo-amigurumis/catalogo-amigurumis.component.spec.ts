import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoAmigurumisComponent } from './catalogo-amigurumis.component';

describe('CatalogoAmigurumisComponent', () => {
  let component: CatalogoAmigurumisComponent;
  let fixture: ComponentFixture<CatalogoAmigurumisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoAmigurumisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoAmigurumisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
