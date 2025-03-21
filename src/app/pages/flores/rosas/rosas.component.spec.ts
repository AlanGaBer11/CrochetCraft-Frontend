import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosasComponent } from './rosas.component';

describe('RosasComponent', () => {
  let component: RosasComponent;
  let fixture: ComponentFixture<RosasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RosasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RosasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
