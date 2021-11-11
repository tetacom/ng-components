import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadCellComponent } from './head-cell.component';

describe('TableHeadCellComponent', () => {
  let component: HeadCellComponent;
  let fixture: ComponentFixture<HeadCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
