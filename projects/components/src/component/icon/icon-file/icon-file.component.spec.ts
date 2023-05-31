import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconFileComponent } from './icon-file.component';

describe('IconFileComponent', () => {
  let component: IconFileComponent;
  let fixture: ComponentFixture<IconFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconFileComponent]
    })
      .compileComponents();
  });

    beforeEach(() => {
    fixture = TestBed.createComponent(IconFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
