import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadCellHostComponent } from './head-cell-host.component';

describe('HeadCellComponent', () => {
  let component: HeadCellHostComponent;
  let fixture: ComponentFixture<HeadCellHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [HeadCellHostComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadCellHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
