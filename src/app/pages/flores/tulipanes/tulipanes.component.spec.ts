import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TulipanesComponent } from './tulipanes.component';

describe('TulipanesComponent', () => {
  let component: TulipanesComponent;
  let fixture: ComponentFixture<TulipanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TulipanesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TulipanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
