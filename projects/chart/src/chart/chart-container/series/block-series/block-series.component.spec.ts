import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockSeriesComponent } from './block-series.component';

describe('BlockSeriesComponent', () => {
  let component: BlockSeriesComponent;
  let fixture: ComponentFixture<BlockSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlockSeriesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
