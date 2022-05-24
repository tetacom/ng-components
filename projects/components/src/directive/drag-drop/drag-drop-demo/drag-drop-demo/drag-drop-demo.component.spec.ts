import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDropDemoComponent } from './drag-drop-demo.component';

describe('DragDropDemoComponent', () => {
  let component: DragDropDemoComponent;
  let fixture: ComponentFixture<DragDropDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDropDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDropDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
