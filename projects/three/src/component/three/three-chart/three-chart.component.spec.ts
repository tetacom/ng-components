import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeChartComponent } from './three-chart.component';

describe('ThreeChartComponent', () => {
  let component: ThreeChartComponent;
  let fixture: ComponentFixture<ThreeChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreeChartComponent],
    });
    fixture = TestBed.createComponent(ThreeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
