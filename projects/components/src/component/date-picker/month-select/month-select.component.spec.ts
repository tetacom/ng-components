import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MonthSelectComponent } from './month-select.component';

describe('ItskMonthSelectorComponent', () => {
  let component: MonthSelectComponent;
  let fixture: ComponentFixture<MonthSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
