import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineSeriesComponent } from './line-series.component';
import { BasePoint } from '../../../model/base-point';

describe('LineSeriesComponent', () => {
  let component: LineSeriesComponent<BasePoint>;
  let fixture: ComponentFixture<LineSeriesComponent<BasePoint>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LineSeriesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
