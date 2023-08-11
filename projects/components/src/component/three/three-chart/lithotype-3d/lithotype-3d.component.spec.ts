import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lithotype3dComponent } from './lithotype-3d.component';

describe('Lithotype3dComponent', () => {
  let component: Lithotype3dComponent;
  let fixture: ComponentFixture<Lithotype3dComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Lithotype3dComponent],
    });
    fixture = TestBed.createComponent(Lithotype3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
