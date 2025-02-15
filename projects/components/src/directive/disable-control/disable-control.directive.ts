import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[tetaDisableControl]',
  standalone: true,
})
export class DisableControlDirective {
  @Input() set tetaDisableControl(val: boolean) {
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

  constructor(private ngControl: NgControl) {}
}
