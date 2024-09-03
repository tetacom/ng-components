import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotBandComponent } from './plot-band.component';

describe('PlotbandComponent', () => {
  let component: PlotBandComponent;
  let fixture: ComponentFixture<PlotBandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlotBandComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotBandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
