import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GirasolComponent } from './girasol.component';

describe('GirasolComponent', () => {
  let component: GirasolComponent;
  let fixture: ComponentFixture<GirasolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GirasolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GirasolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
