import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Base3dSeriesComponent } from './base3d-series.component';

describe('Base3dSeriesComponent', () => {
  let component: Base3dSeriesComponent;
  let fixture: ComponentFixture<Base3dSeriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Base3dSeriesComponent]
    });
    fixture = TestBed.createComponent(Base3dSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
