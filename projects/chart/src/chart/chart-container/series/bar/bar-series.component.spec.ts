import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarSeriesComponent } from './bar-series.component';

describe('BarSeriesComponent', () => {
  let component: BarSeriesComponent;
  let fixture: ComponentFixture<BarSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
