import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableHeadGroupComponent } from './table-head-group.component';

describe('TableHeadGroupComponent', () => {
  let component: TableHeadGroupComponent<any>;
  let fixture: ComponentFixture<TableHeadGroupComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableHeadGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableHeadGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
