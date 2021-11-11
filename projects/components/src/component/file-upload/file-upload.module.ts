import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadAreaComponent } from './file-upload-area/file-upload-area.component';
import { FileItemComponent } from './file-item/file-item.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [FileUploadAreaComponent, FileItemComponent],
  exports: [FileUploadAreaComponent, FileItemComponent],
  imports: [CommonModule, ButtonModule, IconModule],
})
export class FileUploadModule {}
