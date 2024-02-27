import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyGridDemoComponent } from './property-grid-demo.component';

describe('PropertyGridDemoComponent', () => {
  let component: PropertyGridDemoComponent;
  let fixture: ComponentFixture<PropertyGridDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PropertyGridDemoComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(PropertyGridDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
