import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Area3dComponent } from './area-3d.component';

describe('AreaComponent', () => {
  let component: Area3dComponent;
  let fixture: ComponentFixture<Area3dComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Area3dComponent],
    });
    fixture = TestBed.createComponent(Area3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
