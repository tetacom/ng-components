import { Directive, Input, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[tetaDisableControl]',
  standalone: true,
})
export class DisableControlDirective implements OnInit {
  private disabled: boolean;

  @Input() set tetaDisableControl(val: boolean) {
    this.toggleControl(val);
    this.disabled = val;
  }

  constructor(private ngControl: NgControl) {}

  ngOnInit() {
    this.toggleControl(this.disabled);
  }

  private toggleControl(val: boolean) {
    if (this.ngControl.control) {
      if (val) {
        this.ngControl.control.disable({
          emitEvent: false,
        });
      } else {
        this.ngControl.control.enable({
          emitEvent: false,
        });
      }
    }
  }
}
