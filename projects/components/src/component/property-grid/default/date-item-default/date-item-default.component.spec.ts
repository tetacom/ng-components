import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateItemDefaultComponent } from './date-item-default.component';

describe('DateItemDefaultComponent', () => {
  let component: DateItemDefaultComponent;
  let fixture: ComponentFixture<DateItemDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateItemDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DateItemDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
