import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[tetaDisableControl]',
})
export class DisableControlDirective {
  @Input() set tetaDisableControl(val: boolean) {
    console.log('set tetaDisableControl', val);
    if (this.ngControl.control) {
      if (val) {
        this.ngControl.control.disable();
      } else {
        this.ngControl.control.enable();
      }
    }
  }

  constructor(private ngControl: NgControl) {}
}
