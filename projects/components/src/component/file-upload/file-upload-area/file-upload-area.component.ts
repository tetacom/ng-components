import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'teta-file-upload-area-3d',
  templateUrl: './file-upload-area.component.html',
  styleUrls: ['./file-upload-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadAreaComponent implements OnInit {
  @HostBinding('class.file-upload') fileUpload = true;

  @HostBinding('class.file-upload_active')
  get fileUploadActive() {
    return this._asActive;
  }

  @Input() multiple = true;
  @Input() disabled: boolean;
  @Input() accept: string[];

  @Output() upload: EventEmitter<FileList> = new EventEmitter();

  @ViewChild('fileUpload', { static: false }) input: ElementRef;
  @ContentChild('buttonTemplate') buttonTemplate: TemplateRef<any>;
  files: any;

  private _asActive: boolean;

  constructor() {}

  @HostListener('dragenter', ['$event']) dragEnter(event) {
    this.preventDefaults(event);
    this._asActive = true;
  }

  @HostListener('dragover', ['$event']) dragOver(event) {
    this.preventDefaults(event);
    this._asActive = true;
  }

  @HostListener('dragleave', ['$event']) dragLeave(event) {
    this.preventDefaults(event);
    this._asActive = false;
  }

  @HostListener('drop', ['$event']) drop(event) {
    this.upload.emit(event.dataTransfer.files);
    this.preventDefaults(event);
  }

  ngOnInit() {}

  fileChanged(event: any) {
    if (event.target && event.target.files) {
      this.upload.emit(event.target.files);
      this.input.nativeElement.value = null;
    }
  }

  private preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
  }
}
