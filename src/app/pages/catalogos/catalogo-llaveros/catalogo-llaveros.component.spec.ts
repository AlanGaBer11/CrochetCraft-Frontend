import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoLlaverosComponent } from './catalogo-llaveros.component';

describe('CatalogoLlaverosComponent', () => {
  let component: CatalogoLlaverosComponent;
  let fixture: ComponentFixture<CatalogoLlaverosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoLlaverosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogoLlaverosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
