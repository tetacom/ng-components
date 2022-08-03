import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { TextFieldComponent } from './text-field/text-field.component';
import { IconModule } from '../icon/icon.module';
import { FormsModule } from '@angular/forms';
import { OnlyNumberModule } from '../../directive/only-number/only-number.module';
import { FormGroupTitleComponent } from './form-group-title/form-group-title.component';
import {HintModule} from '../../directive/hint/hint.module';

@NgModule({
  declarations: [InputComponent, TextFieldComponent, FormGroupTitleComponent],
  exports: [InputComponent, TextFieldComponent, FormGroupTitleComponent],
  imports: [CommonModule, IconModule, FormsModule, OnlyNumberModule, HintModule],
})
export class InputModule {}
