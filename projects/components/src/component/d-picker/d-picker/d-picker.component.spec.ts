import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DPickerComponent } from './d-picker.component';

describe('DPickerComponent', () => {
  let component: DPickerComponent;
  let fixture: ComponentFixture<DPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DPickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
