import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockHorizontalSeriesComponent } from './block-horizontal-series.component';

describe('BlockHorizontalSeriesComponent', () => {
  let component: BlockHorizontalSeriesComponent;
  let fixture: ComponentFixture<BlockHorizontalSeriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlockHorizontalSeriesComponent]
    });
    fixture = TestBed.createComponent(BlockHorizontalSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
