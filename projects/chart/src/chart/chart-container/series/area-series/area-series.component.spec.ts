import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaSeriesComponent } from './area-series.component';

describe('AreaSeriesComponent', () => {
  let component: AreaSeriesComponent;
  let fixture: ComponentFixture<AreaSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
