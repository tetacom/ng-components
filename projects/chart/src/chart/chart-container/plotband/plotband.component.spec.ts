import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotbandComponent } from './plotband.component';

describe('PlotbandComponent', () => {
  let component: PlotbandComponent;
  let fixture: ComponentFixture<PlotbandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlotbandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotbandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
