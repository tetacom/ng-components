import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyGridGroupComponent } from './property-grid-group.component';

describe('PropertyGridGroupComponent', () => {
  let component: PropertyGridGroupComponent;
  let fixture: ComponentFixture<PropertyGridGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PropertyGridGroupComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyGridGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
