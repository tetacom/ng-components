import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBodyComponent } from './table-body.component';

describe('TableBodyComponent', () => {
  let component: TableBodyComponent<any>;
  let fixture: ComponentFixture<TableBodyComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableBodyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
