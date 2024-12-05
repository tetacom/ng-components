import {
  ChangeDetectorRef,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { DragPreviewDirective } from './drag-preview.directive';
import { DragContainerInstance } from './model/drag-container-instance';
import { DragDropService } from './drag-drop.service';
import { takeWhile } from 'rxjs/operators';
import { DropTarget } from './model/drop-target';
import { DropEvent } from './model/drop-event';
import { DragInstance } from './model/drag-instance';

@Directive({
  selector: '[tetaDragContainer]',
  exportAs: 'dragContainer',
  host: {
    '[class.teta-drag-container]': '"true"',
    '[class.teta-drop-target]': 'isDropTarget',
  },
  standalone: true,
})
export class DragContainerDirective<T> implements OnInit, OnDestroy {
  @Input('tetaDragContainer') data: T[];
  @Input() multiple = false;
  @Input() allowDrop = true;

  @Output() tetaDrop = new EventEmitter<DropEvent<T>>();
  @Output() tetaDragEnter = new EventEmitter<DragInstance<T>>();

  @ContentChild(DragPreviewDirective, {
    static: true,
  })
  private _previewTemplate: DragPreviewDirective;

  instance: DragContainerInstance<T>;
  dropTarget: DropTarget<T>;
  private _alive = true;

  get isDropTarget() {
    return this.dropTarget === this.instance;
  }

  @HostListener('mouseleave', ['$event']) mouseleave(event) {
    this._dragService.setDropTarget(null);
  }

  @HostListener('mouseover', ['$event']) mouseover(event) {
    if (this.allowDrop) {
      this._dragService.setDropTarget(this.instance);
    }
  }

  @HostListener('window:keydown.escape', ['$event']) escape(event) {
    this._dragService.cancelDrag();
  }

  constructor(
    private _dragService: DragDropService<T>,
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _zone: NgZone,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.instance = new DragContainerInstance<T>({
      data: this.data,
      previewTemplate: this._previewTemplate?.templateRef,
      viewContainer: this._viewContainerRef,
    });
    this._dragService.dropTarget.pipe(takeWhile(() => this._alive)).subscribe((target) => {
      this.dropTarget = target;
      this._cdr.detectChanges();
    });

    this._dragService.dropped.pipe(takeWhile(() => this._alive)).subscribe((event) => {
      this.tetaDrop.emit(event);
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
