import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SampleInputComponent} from './sample-input/sample-input.component';
import {InputModule} from '../input.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    SampleInputComponent
  ],
  exports: [
    SampleInputComponent
  ],
  imports: [
    CommonModule,
    InputModule,
    ReactiveFormsModule
  ]
})
export class SampleInputModule {
}
