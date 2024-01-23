import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeItemToggleComponent } from './tree-item-toggle.component';

describe('TreeItemToggleComponent', () => {
  let component: TreeItemToggleComponent;
  let fixture: ComponentFixture<TreeItemToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [TreeItemToggleComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeItemToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
