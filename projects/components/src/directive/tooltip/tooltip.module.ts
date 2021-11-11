import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { DynamicComponentModule } from '../../component/dynamic-component/dynamic-component.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [TooltipDirective],
  exports: [TooltipDirective],
  imports: [CommonModule, DynamicComponentModule, BrowserAnimationsModule],
})
export class TooltipModule {}
