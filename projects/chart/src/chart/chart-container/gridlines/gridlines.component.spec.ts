import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridlinesComponent } from './gridlines.component';

describe('GridlinesComponent', () => {
  let component: GridlinesComponent;
  let fixture: ComponentFixture<GridlinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridlinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GridlinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
