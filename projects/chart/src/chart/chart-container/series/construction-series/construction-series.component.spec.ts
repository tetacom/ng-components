import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionSeriesComponent } from './construction-series.component';

describe('ConstructionSeriesComponent', () => {
  let component: ConstructionSeriesComponent;
  let fixture: ComponentFixture<ConstructionSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstructionSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConstructionSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
