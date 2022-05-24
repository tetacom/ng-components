import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandCardComponent } from './expand-card.component';

describe('ExpandCardComponent', () => {
  let component: ExpandCardComponent;
  let fixture: ComponentFixture<ExpandCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
