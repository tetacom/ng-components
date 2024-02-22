import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooleanFilterComponent } from './boolean-filter.component';

describe('BooleanFilterComponent', () => {
  let component: BooleanFilterComponent;
  let fixture: ComponentFixture<BooleanFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [BooleanFilterComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooleanFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
