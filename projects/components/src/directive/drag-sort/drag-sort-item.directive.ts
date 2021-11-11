import {
  Directive,
  ElementRef,
  Host,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import {DragSortContainerDirective} from './drag-sort-container.directive';

@Directive({
  selector: '[tetaDragSortItem]',
})
export class DragSortItemDirective<T> implements OnInit, OnDestroy {
  @Input() tetaDragSortItem: T;
  @Input() dragSortDirection: 'horizontal' | 'vertical' = 'horizontal';

  @HostBinding('attr.draggable') private readonly draggable = true;
  @HostBinding('class.position-relative') private readonly relative = true;

  private _dragElement: HTMLElement;

  private rect: any;

  constructor(
    @Host() private _container: DragSortContainerDirective<T>,
    private _elementRef: ElementRef,
    private _renderer: Renderer2
  ) {
  }

  @HostListener('dragstart', ['$event']) dragstart(event: DragEvent): void {
    this._container.setDragItem(this.tetaDragSortItem);
  }

  @HostListener('dragenter', ['$event']) dragenter(event: DragEvent): void {
    this.rect = this._elementRef.nativeElement.getBoundingClientRect();
  }

  @HostListener('dragover', ['$event']) dragover(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.rect && this._container.getDragItem()) {
      this.showDrag(this.getDropPosition(event));
    }
  }

  @HostListener('dragleave', ['$event']) dragleave(event: DragEvent): void {
    event.preventDefault();
    this.hideDrag();
  }

  @HostListener('dragend', ['$event']) dragend(event: DragEvent): void {
    this._container.setDragItem(null);
    this.hideDrag();
  }

  @HostListener('drop', ['$event']) drop(event: DragEvent): void {
    event.stopPropagation();
    this._container.updateSortOrder(
      this._container.getDragItem(),
      this.tetaDragSortItem,
      this.getDropPosition(event) === 'start'
    );
    this.hideDrag();
  }

  ngOnInit() {
    this.createDrag();
  }

  ngOnDestroy() {
    this.destroyDrag();
  }

  private showDrag(position: 'start' | 'end') {
    this.hideDrag();
    this._renderer.addClass(this._dragElement, `drop-direction-${position}`);
  }

  private hideDrag() {
    this._renderer.removeClass(this._dragElement, 'drop-direction-start');
    this._renderer.removeClass(this._dragElement, 'drop-direction-end');
  }

  private createDrag() {
    this._dragElement = this._renderer.createElement('div');
    this._renderer.appendChild(
      this._elementRef.nativeElement,
      this._dragElement
    );
    this._renderer.addClass(this._dragElement, 'drop-direction');
    this._renderer.addClass(
      this._dragElement,
      this.dragSortDirection === 'horizontal'
        ? 'drop-direction-horizontal'
        : 'drop-direction-vertical'
    );
  }

  private destroyDrag() {
    this._renderer.removeChild(this._renderer, this._dragElement);
  }

  private getDropPosition(event: DragEvent) {
    if (this.dragSortDirection === 'horizontal') {
      return event.clientX >= this.rect.x + this.rect.width / 2
        ? 'end'
        : 'start';
    } else {
      return event.clientY >= this.rect.y + this.rect.height / 2
        ? 'end'
        : 'start';
    }
  }
}
