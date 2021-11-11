import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart3dComponent } from './chart3d/chart3d.component';

@NgModule({
  declarations: [Chart3dComponent],
  exports: [Chart3dComponent],
  imports: [CommonModule],
})
export class Chart3dModule {}
