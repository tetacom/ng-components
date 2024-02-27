import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFromComponentComponent } from './modal-from-component.component';

describe('ModalFromComponentComponent', () => {
  let component: ModalFromComponentComponent;
  let fixture: ComponentFixture<ModalFromComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ModalFromComponentComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFromComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
