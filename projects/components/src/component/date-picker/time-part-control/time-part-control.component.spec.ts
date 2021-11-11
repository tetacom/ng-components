import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePartControlComponent } from './time-part-control.component';

describe('TimePartControlComponent', () => {
  let component: TimePartControlComponent;
  let fixture: ComponentFixture<TimePartControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimePartControlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePartControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
