import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DaySelectComponent } from './day-select.component';

describe('ItskDaySelectorComponent', () => {
  let component: DaySelectComponent;
  let fixture: ComponentFixture<DaySelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DaySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
