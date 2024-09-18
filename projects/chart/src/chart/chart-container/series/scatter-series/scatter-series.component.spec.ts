import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScatterSeriesComponent } from './scatter-series.component';

describe('ScatterSeriesComponent', () => {
  let component: ScatterSeriesComponent;
  let fixture: ComponentFixture<ScatterSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScatterSeriesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
