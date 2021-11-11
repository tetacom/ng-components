import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCellComponent } from './list-cell.component';

describe('ListCellComponent', () => {
  let component: ListCellComponent;
  let fixture: ComponentFixture<ListCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
