import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemDefaultComponent } from './list-item-default.component';

describe('ListItemDefaultComponent', () => {
  let component: ListItemDefaultComponent;
  let fixture: ComponentFixture<ListItemDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListItemDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
