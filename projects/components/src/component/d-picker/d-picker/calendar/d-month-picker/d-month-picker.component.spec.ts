import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DMonthPickerComponent } from './d-month-picker.component';

describe('MonthPickerComponent', () => {
  let component: DMonthPickerComponent;
  let fixture: ComponentFixture<DMonthPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DMonthPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DMonthPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
