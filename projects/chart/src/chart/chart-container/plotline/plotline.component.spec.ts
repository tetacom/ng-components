import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotlineComponent } from './plotline.component';

describe('PlotlineComponent', () => {
  let component: PlotlineComponent;
  let fixture: ComponentFixture<PlotlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlotlineComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
