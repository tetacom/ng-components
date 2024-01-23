import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneGraphComponent } from './scene.component';

describe('SceneGraphComponent', () => {
  let component: SceneGraphComponent;
  let fixture: ComponentFixture<SceneGraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [SceneGraphComponent],
});
    fixture = TestBed.createComponent(SceneGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
