import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSampleComponent } from './alert-sample.component';

describe('AlertSampleComponent', () => {
  let component: AlertSampleComponent;
  let fixture: ComponentFixture<AlertSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
