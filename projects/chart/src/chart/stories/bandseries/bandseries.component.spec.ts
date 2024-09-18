import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandseriesComponent } from './bandseries.component';

describe('BandseriesComponent', () => {
  let component: BandseriesComponent;
  let fixture: ComponentFixture<BandseriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BandseriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BandseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
