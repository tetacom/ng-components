import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringItemDefaultComponent } from './string-item-default.component';

describe('StringItemDefaultComponent', () => {
  let component: StringItemDefaultComponent;
  let fixture: ComponentFixture<StringItemDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StringItemDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StringItemDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
