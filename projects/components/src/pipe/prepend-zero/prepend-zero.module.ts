import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrependZeroPipe } from './prepend-zero.pipe';

@NgModule({
  declarations: [PrependZeroPipe],
  exports: [PrependZeroPipe],
  imports: [CommonModule],
})
export class PrependZeroModule {}
