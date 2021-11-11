import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { YearSelectComponent } from './year-select.component';

describe('ItskYearSelectorComponent', () => {
  let component: YearSelectComponent;
  let fixture: ComponentFixture<YearSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ YearSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
