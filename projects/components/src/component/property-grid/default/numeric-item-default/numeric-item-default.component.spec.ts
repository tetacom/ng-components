import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumericItemDefaultComponent } from './numeric-item-default.component';

describe('NumericItemDefaultComponent', () => {
  let component: NumericItemDefaultComponent;
  let fixture: ComponentFixture<NumericItemDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumericItemDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumericItemDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
