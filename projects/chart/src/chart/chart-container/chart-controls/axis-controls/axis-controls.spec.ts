import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AxisControls } from './axis-controls';

describe('AxisControls', () => {
  let component: AxisControls;
  let fixture: ComponentFixture<AxisControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AxisControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AxisControls);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
