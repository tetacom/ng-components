import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasComponent } from './canvas.component';

describe('DComponent', () => {
  let component: CanvasComponent;
  let fixture: ComponentFixture<CanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CanvasComponent],
    });
    fixture = TestBed.createComponent(CanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
