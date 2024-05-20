import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BendConstructionSeriesComponent } from './bend-construction-series.component';

describe('BendConstructionSeriesComponent', () => {
  let component: BendConstructionSeriesComponent;
  let fixture: ComponentFixture<BendConstructionSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BendConstructionSeriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BendConstructionSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
