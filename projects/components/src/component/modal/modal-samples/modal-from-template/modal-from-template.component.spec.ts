import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFromTemplateComponent } from './modal-from-template.component';

describe('ModalFromTemplateComponent', () => {
  let component: ModalFromTemplateComponent;
  let fixture: ComponentFixture<ModalFromTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalFromTemplateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFromTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
