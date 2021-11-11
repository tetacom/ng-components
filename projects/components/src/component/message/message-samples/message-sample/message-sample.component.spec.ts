import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSampleComponent } from './message-sample.component';

describe('MessageSampleComponent', () => {
  let component: MessageSampleComponent;
  let fixture: ComponentFixture<MessageSampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageSampleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
