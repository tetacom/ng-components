import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterDropdownTabComponent } from './filter-dropdown-tab.component';

describe('FilterDropdownTabComponent', () => {
  let component: FilterDropdownTabComponent;
  let fixture: ComponentFixture<FilterDropdownTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterDropdownTabComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterDropdownTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
