import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Chart3dComponent } from './chart3d.component';

describe('Chart3dComponent', () => {
  let component: Chart3dComponent;
  let fixture: ComponentFixture<Chart3dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Chart3dComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Chart3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
