import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartControls } from './chart-controls';

describe('ChartControls', () => {
  let component: ChartControls;
  let fixture: ComponentFixture<ChartControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
