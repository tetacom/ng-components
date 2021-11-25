import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesHostComponent } from './series-host.component';

describe('SeriesHostComponent', () => {
  let component: SeriesHostComponent;
  let fixture: ComponentFixture<SeriesHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeriesHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
