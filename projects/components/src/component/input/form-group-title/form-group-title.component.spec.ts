import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormGroupTitleComponent } from './form-group-title.component';

describe('FormGroupTitleComponent', () => {
  let component: FormGroupTitleComponent;
  let fixture: ComponentFixture<FormGroupTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormGroupTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormGroupTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
