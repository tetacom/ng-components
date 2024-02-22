import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Line3dComponent } from './line-3d.component';

describe('Line3dComponent', () => {
  let component: Line3dComponent;
  let fixture: ComponentFixture<Line3dComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Line3dComponent],
    });
    fixture = TestBed.createComponent(Line3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
