import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDropdownTabComponent } from './main-dropdown-tab.component';

describe('MainDropdownTabComponent', () => {
  let component: MainDropdownTabComponent;
  let fixture: ComponentFixture<MainDropdownTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDropdownTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDropdownTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
