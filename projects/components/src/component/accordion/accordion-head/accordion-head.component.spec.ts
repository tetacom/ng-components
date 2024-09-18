import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionHeadComponent } from './accordion-head.component';

describe('AccordionHeadComponent', () => {
  let component: AccordionHeadComponent;
  let fixture: ComponentFixture<AccordionHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionHeadComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
