import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Axes3dComponent } from './axes-3d.component';

describe('Axes3dComponent', () => {
  let component: Axes3dComponent;
  let fixture: ComponentFixture<Axes3dComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Axes3dComponent],
    });
    fixture = TestBed.createComponent(Axes3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
