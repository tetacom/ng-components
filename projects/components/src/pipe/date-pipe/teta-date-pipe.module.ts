import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TetaDatePipe } from './teta-date.pipe';

@NgModule({
  declarations: [TetaDatePipe],
  exports: [TetaDatePipe],
  imports: [CommonModule],
})
export class TetaDatePipeModule {}
