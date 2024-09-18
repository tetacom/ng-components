import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { IconComponent } from '../../icon/icon/icon.component';
import { ButtonComponent } from '../../button/button/button.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'teta-file-upload-area',
  templateUrl: './file-upload-area.component.html',
  styleUrls: ['./file-upload-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgTemplateOutlet, ButtonComponent, IconComponent, TranslocoModule],
})
export class FileUploadAreaComponent {
  @HostBinding('class.file-upload') fileUpload = true;

  @HostBinding('class.file-upload_active')
  get fileUploadActive() {
    return this._asActive;
  }

  @Input() multiple = true;
  @Input() disabled = false;
  @Input() accept: string[] = [];

  @Output() upload: EventEmitter<FileList> = new EventEmitter();

  @ViewChild('fileUpload', { static: false }) input?: ElementRef;
  @ContentChild('buttonTemplate') buttonTemplate?: TemplateRef<any>;
  files: any;

  private _asActive = false;

  @HostListener('dragenter', ['$event']) dragEnter(event: DragEvent) {
    this.preventDefaults(event);
    this._asActive = true;
  }

  @HostListener('dragover', ['$event']) dragOver(event: DragEvent) {
    this.preventDefaults(event);
    this._asActive = true;
  }

  @HostListener('dragleave', ['$event']) dragLeave(event: DragEvent) {
    this.preventDefaults(event);
    this._asActive = false;
  }

  @HostListener('drop', ['$event']) drop(event: DragEvent) {
    this.upload.emit(event.dataTransfer?.files);
    this.preventDefaults(event);
  }

  fileChanged(event: any) {
    if (event.target && event.target.files) {
      this.upload.emit(event.target.files);
      if (this.input) {
        this.input.nativeElement.value = null;
      }
    }
  }

  private preventDefaults(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
