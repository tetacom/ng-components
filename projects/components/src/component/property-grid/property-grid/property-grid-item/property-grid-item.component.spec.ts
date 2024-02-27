import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyGridItemComponent } from './property-grid-item.component';

describe('PropertyGridItemComponent', () => {
  let component: PropertyGridItemComponent<any>;
  let fixture: ComponentFixture<PropertyGridItemComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PropertyGridItemComponent],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
