import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrosshairComponent } from './crosshair.component';

describe('CrosshairComponent', () => {
  let component: CrosshairComponent;
  let fixture: ComponentFixture<CrosshairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrosshairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrosshairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
