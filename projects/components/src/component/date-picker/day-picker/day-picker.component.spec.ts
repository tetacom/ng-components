import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayPickerComponent } from './day-picker.component';

describe('DayPickerComponent', () => {
  let component: DayPickerComponent;
  let fixture: ComponentFixture<DayPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DayPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DayPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
