import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropdownComponent} from './dropdown/dropdown.component';
import {DropdownHeadDirective} from './dropdown-head.directive';
import {DropdownContentDirective} from './dropdown-content.directive';
import {DropdownDirective} from './dropdown.directive';

@NgModule({
  declarations: [
    DropdownComponent,
    DropdownHeadDirective,
    DropdownContentDirective,
    DropdownDirective
  ],
  exports: [
    DropdownComponent,
    DropdownHeadDirective,
    DropdownContentDirective,
    DropdownDirective
  ],
  imports: [
    CommonModule
  ]
})
export class DropdownModule {
}
