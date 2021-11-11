import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './radio/radio.component';
import { RadioButtonComponent } from './radio-button/radio-button.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [RadioComponent, RadioButtonComponent],
  exports: [RadioComponent, RadioButtonComponent],
  imports: [CommonModule, FormsModule],
})
export class RadioModule {}
