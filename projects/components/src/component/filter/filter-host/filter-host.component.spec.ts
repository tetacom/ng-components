import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHostComponent } from './filter-host.component';

describe('FilterHostComponent', () => {
  let component: FilterHostComponent;
  let fixture: ComponentFixture<FilterHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterHostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
