import {ComponentFixture, TestBed} from '@angular/core/testing';

import {StringCellComponent} from './string-cell.component';

describe('StringCellComponent', () => {
  let component: StringCellComponent<any>;
  let fixture: ComponentFixture<StringCellComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [StringCellComponent]
})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StringCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
