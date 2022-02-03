import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockAreaSeriesComponent } from './block-area-series.component';

describe('BlockAreaSeriesComponent', () => {
  let component: BlockAreaSeriesComponent;
  let fixture: ComponentFixture<BlockAreaSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockAreaSeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockAreaSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
