import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandSeriesComponent } from './band-series.component';

describe('BandseriesComponent', () => {
  let component: BandSeriesComponent;
  let fixture: ComponentFixture<BandSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandSeriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BandSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
