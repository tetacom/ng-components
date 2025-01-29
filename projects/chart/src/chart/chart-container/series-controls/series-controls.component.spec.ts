import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesControlsComponent } from './series-controls.component';

describe('SeriesControlsComponent', () => {
  let component: SeriesControlsComponent;
  let fixture: ComponentFixture<SeriesControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeriesControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
