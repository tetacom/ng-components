import { EmbeddedViewRef, Inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { DragInstance } from './model/drag-instance';
import { DragSelection } from './model/drag-selection';
import { DragContainerInstance } from './model/drag-container-instance';
import { Point } from './model/point';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject, fromEvent, merge, Observable, Subject, tap } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';
import { DragProcess } from './model/drag-process';
import { DropTarget } from './model/drop-target';
import { DropEvent } from './model/drop-event';

@Injectable({
  providedIn: 'root',
})
export class DragDropService<T> {
  selection: DragSelection<T>;
  startPosition: Point;
  dragProcess: DragProcess<T>;
  dropTarget: Observable<DropTarget<T>>;
  dropped: Observable<DropEvent<T>>;
  private dropTarget$ = new BehaviorSubject<DropTarget<T>>(null);
  private _delta = 10;
  private _renderer: Renderer2;
  private _preview: HTMLElement;
  private _previewRef: EmbeddedViewRef<any>;
  private dropped$ = new Subject<DropEvent<T>>();

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _rendererFactory: RendererFactory2,
  ) {
    this._renderer = this._rendererFactory.createRenderer(null, null);
    this.dropTarget = this.dropTarget$.asObservable();
    this.dropped = this.dropped$.asObservable();
    merge(fromEvent<MouseEvent>(this._document, 'mousemove'), fromEvent<MouseEvent>(this._document, 'touchmove'))
      .pipe(
        filter(() => {
          return this.startPosition != null;
        }),
      )
      .subscribe((event: MouseEvent) => {
        if (!this.dragProcess && this.getDelta(event) > this._delta) {
          this.startProcess();
        }
        if (this.dragProcess && this._preview) {
          this.movePreview(event);
        }
      });

    merge(fromEvent<MouseEvent>(this._document, 'mouseup'), fromEvent<MouseEvent>(this._document, 'touchend'))
      .pipe(withLatestFrom(this.dropTarget))
      .subscribe((data: [MouseEvent, DropTarget<T>]) => {
        const [event, target] = data;
        if (target) {
          this.dropped$.next({
            target,
            container: this.dragProcess.selection.container,
            data: [...this.dragProcess.selection.items],
          });
          this.cancelDrag();
        }
        this.stopProcess();
      });

    merge(fromEvent(this._document, 'visibilitychange'), fromEvent(window, 'blur')).subscribe(() => {
      this.cancelDrag();
    });
  }

  setDropTarget(target: DropTarget<T>) {
    if (this.dragProcess) {
      this.dropTarget$.next(target);
    }
  }

  setStartPosition(point: Point) {
    this.startPosition = point;
  }

  setSelection(instance: DragInstance<T>, container: DragContainerInstance<T>) {
    if (this.selection?.container === container && this.selection?.items?.indexOf(instance) >= 0) {
      return;
    }
    this.selection = {
      container,
      items: [instance],
    };
  }

  addSelection(instance: DragInstance<T>, container: DragContainerInstance<T>) {
    if (!this.selection) {
      this.setSelection(instance, container);
      return;
    }
    if (this.selection && this.selection.container !== container) {
      return;
    }

    const index = this.selection.items.indexOf(instance);
    if (index < 0) {
      this.selection.items.push(instance);
    } else {
      this.selection.items.splice(index, 1);
    }
  }

  clearSelection() {
    this.selection = null;
  }

  cancelDrag() {
    this.setDropTarget(null);
    this.clearSelection();
    this.stopProcess();
  }

  startProcess() {
    this.dragProcess = {
      selection: this.selection,
    };
    this._document.body.style.cursor = 'copy';
    this._preview = this.createPreview();
  }

  stopProcess() {
    this.destroyPreview();
    this._document.body.style.cursor = 'default';
    this.dragProcess = null;
    this.startPosition = null;
  }

  private getDelta(event: MouseEvent) {
    return Math.max(Math.abs(this.startPosition.x - event.x), Math.abs(this.startPosition.y - event.y));
  }

  private createPreview() {
    if (this.dragProcess.selection.container.previewTemplate) {
      this._previewRef = this.dragProcess.selection.container.viewContainer.createEmbeddedView(
        this.dragProcess.selection.container.previewTemplate,
        {
          $implicit: this.dragProcess.selection.items,
          data: this.dragProcess.selection.items,
        },
      );
      const preview = this._renderer.createElement('div');
      this._renderer.setStyle(preview, 'position', 'fixed');
      this._renderer.setStyle(preview, 'pointer-events', 'none');
      this._renderer.setStyle(preview, 'top', '0');
      this._renderer.setStyle(preview, 'left', '0');
      this._renderer.appendChild(preview, this._previewRef.rootNodes[0]);
      this._renderer.appendChild(document.body, preview);
      return preview;
    }
    return null;
  }

  private movePreview(event: MouseEvent) {
    if (this._preview) {
      this._renderer.setStyle(this._preview, 'transform', `translate(${event.x}px, ${event.y}px)`);
    }
  }

  private destroyPreview() {
    if (this._preview) {
      this.dragProcess?.selection?.container?.viewContainer?.clear();
      this._preview?.remove();
      this._previewRef?.destroy();
      this._preview = this._previewRef = null;
    }
  }
}
