import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopupContentComponent} from './popup-content/popup-content.component';

@NgModule({
  declarations: [PopupContentComponent],
  exports: [PopupContentComponent],
  imports: [
    CommonModule
  ]
})
export class DynamicComponentModule {
}
