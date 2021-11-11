import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoAutofillDirective } from './no-autofill.directive';

@NgModule({
  exports: [NoAutofillDirective],
  declarations: [NoAutofillDirective],
  imports: [CommonModule],
})
export class NoAutofillModule {}
