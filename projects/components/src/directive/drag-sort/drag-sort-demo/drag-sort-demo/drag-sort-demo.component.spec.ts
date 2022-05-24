import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragSortDemoComponent } from './drag-sort-demo.component';

describe('DragSortDemoComponent', () => {
  let component: DragSortDemoComponent;
  let fixture: ComponentFixture<DragSortDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragSortDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragSortDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
