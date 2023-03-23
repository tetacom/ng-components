import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AutocompleteComponent} from './autocomplete/autocomplete.component';

@NgModule({
  declarations: [
    AutocompleteComponent
  ],
  exports: [
    AutocompleteComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AutocompleteModule {
}
