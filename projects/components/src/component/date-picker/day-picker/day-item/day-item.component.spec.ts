import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayItemComponent } from './day-item.component';

describe('DayItemComponent', () => {
  let component: DayItemComponent;
  let fixture: ComponentFixture<DayItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DayItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
