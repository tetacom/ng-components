import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomSeriesComponent } from './custom-series.component';

describe('CustomSeriesComponent', () => {
  let component: CustomSeriesComponent;
  let fixture: ComponentFixture<CustomSeriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomSeriesComponent],
    });
    fixture = TestBed.createComponent(CustomSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
