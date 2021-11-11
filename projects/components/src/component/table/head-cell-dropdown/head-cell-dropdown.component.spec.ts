import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadCellDropdownComponent } from './head-cell-dropdown.component';

describe('HeadCellDropdownComponent', () => {
  let component: HeadCellDropdownComponent;
  let fixture: ComponentFixture<HeadCellDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadCellDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadCellDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
