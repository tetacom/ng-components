import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResizePanelComponent } from './resize-panel.component';

describe('ResizePanelComponent', () => {
  let component: ResizePanelComponent;
  let fixture: ComponentFixture<ResizePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResizePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResizePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
