import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Block3dComponent } from './block-3d.component';

describe('block3dComponent', () => {
  let component: Block3dComponent<any>;
  let fixture: ComponentFixture<Block3dComponent<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Block3dComponent],
    });
    fixture = TestBed.createComponent(Block3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
