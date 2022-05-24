import {
  ChangeDetectorRef,
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Inject,
  Input, NgZone, OnDestroy,
  OnInit,
  Optional,
  Output,
  SkipSelf
} from '@angular/core';
import {DragInstance} from './model/drag-instance';
import {DragContainerDirective} from './drag-container.directive';
import {DragDropService} from './drag-drop.service';
import {DropTarget} from './model/drop-target';
import {filter, takeWhile} from 'rxjs/operators';
import {DropEvent} from './model/drop-event';

@Directive({
  selector: '[tetaDrag]',
  exportAs: 'drag',
  host: {
    '[style.userSelect]': '"none"',
    '[class.teta-drag-item]': '"true"'
  }
})
export class DragDirective<T> implements OnInit, OnDestroy {
  @Input('tetaDrag') data: T;

  @HostBinding('class.teta_draggable_item')
  @Input() allowDrag = true;

  @HostBinding('class.teta_droppable_item')
  @Input() allowDrop = true;

  @Output() tetaDragEnter = new EventEmitter<DragInstance<T>>();
  @Output() tetaDrop = new EventEmitter<DropEvent<T>>();

  dropTarget: DropTarget<T>;
  instance: DragInstance<T>;

  @HostBinding('class.teta-drag-selection')
  get selection() {
    return this._dragService?.selection?.items?.indexOf(this.instance) >= 0;
  }

  @HostBinding('class.teta-drop-target')
  get isDropTarget() {
    return this.dropTarget === this.instance;
  }

  private _alive = true;

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  mousedown(event) {
    if (event.ctrlKey && this._container?.multiple) {
      this._dragService.addSelection(this.instance, this._container.instance);
    } else {
      this._dragService.setSelection(this.instance, this._container.instance);
    }
    this._dragService.setStartPosition({
      x: event.x,
      y: event.y
    });
  }

  @HostListener('mouseenter', ['$event'])
  mouseenter(event: MouseEvent) {
    if (this.allowDrop) {
      event.stopPropagation();
      this._dragService.setDropTarget(this.instance);
    }
  }

  @HostListener('mouseleave', ['$event']) mouseleave(event) {
    this._dragService.setDropTarget(null);
  }

  constructor(@Inject(DragContainerDirective) @Optional() @SkipSelf() private _container: DragContainerDirective<T>,
              private _dragService: DragDropService<T>,
              private _zone: NgZone,
              private _cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.instance = new DragInstance({
      container: this._container.instance,
      data: this.data
    });
    this._dragService.dropTarget.pipe(takeWhile(() => this._alive))
      .subscribe((target) => {
        this.dropTarget = target;
        if (target === this.instance) {
          this.tetaDragEnter.emit(this.instance);
        }
        this._cdr.detectChanges();
        this._cdr.markForCheck();
      });
    this._dragService.dropped.pipe(takeWhile(() => this._alive))
      .pipe(
        filter((event: DropEvent<T>) => {
          return event.target === this.instance;
        }))
      .subscribe((event) => {
        this.tetaDrop.emit(event);
      });
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
