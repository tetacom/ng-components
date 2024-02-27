import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisibilityDropdownTabComponent } from './visibility-dropdown-tab.component';

describe('VisibilityDropdownTabComponent', () => {
  let component: VisibilityDropdownTabComponent;
  let fixture: ComponentFixture<VisibilityDropdownTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [VisibilityDropdownTabComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisibilityDropdownTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
