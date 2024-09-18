import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandItemComponent } from './expand-item.component';

describe('ExpandItemComponent', () => {
  let component: ExpandItemComponent;
  let fixture: ComponentFixture<ExpandItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExpandItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
