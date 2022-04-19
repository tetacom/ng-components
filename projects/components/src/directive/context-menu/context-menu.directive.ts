import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostListener,
  Inject,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  TemplateRef,
  Type,
} from '@angular/core';
import {DynamicComponentService} from '../../common/service/dynamic-component.service';
import {DOCUMENT} from '@angular/common';
import {ArrayUtil} from '../../common/util/array-util';
import {DomUtil} from '../../common/util/dom-util';
import {PositionUtil} from '../../common/util/position-util';
import {DynamicContentBaseDirective} from '../dynamic-content-base.directive';
import {ClickService} from '../../common/service/click.service';
import {merge} from 'rxjs';
import {filter, takeWhile, tap} from 'rxjs/operators';

@Directive({
  selector: '[tetaContextMenu]',
})
export class ContextMenuDirective
  extends DynamicContentBaseDirective
  implements OnDestroy, OnInit {
  /**
   * Строка, шаблон или компонент для создания контекстного меню
   */
  @Input() tetaContextMenu: string | TemplateRef<any> | Type<any>;

  get _dynamicContent() {
    return this.tetaContextMenu;
  }

  private _eventPoint: {
    x: number;
    y: number;
  };

  constructor(
    @Inject(DOCUMENT)
    protected override _document: any,
    protected override _elementRef: ElementRef,
    protected override _service: DynamicComponentService,
    protected override _injector: Injector,
    protected override _zone: NgZone,
    protected override _cdr: ChangeDetectorRef,
    private _click: ClickService
  ) {
    super(_document, _elementRef, _service, _injector, _zone, _cdr);
  }

  @HostListener('contextmenu', ['$event'])
  showContent(event: MouseEvent): void {
    if(this.tetaContextMenu) {
      event.preventDefault();
      setTimeout(() => {
        this.createMenu(event);
      });
    }
  }

  @HostListener('click', ['$event'])
  click(event: MouseEvent): void {
    if (
      this._componentRef &&
      DomUtil.clickedInside(this._componentRef.location.nativeElement, event)
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  override ngOnInit() {
    super.ngOnInit();
    merge(this._click.click, this._click.contextMenu)
      .pipe(
        takeWhile(() => this._alive),
        filter(() => this._open),
        filter(() => this._componentRef != null),
        filter(
          (event: MouseEvent) =>
            !DomUtil.clickedInside(
              this._componentRef.location.nativeElement,
              event
            )
        ),
        tap((_) => {
          this.destroyContentRef();
          this.openChange.emit(false);
        })
      )
      .subscribe();
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
  }

  protected setPosition() {
    if (this._componentRef && this._open) {
      const position = PositionUtil.getPosition(
        {
          top: this._eventPoint.y,
          bottom: this._eventPoint.y,
          left: this._eventPoint.x,
          right: this._eventPoint.x,
        },
        this._componentRef.location.nativeElement.getBoundingClientRect(),
        this.align,
        this.verticalAlign
      );
      PositionUtil.setElementPosition(
        this._componentRef.location.nativeElement,
        position
      );
    }
  }

  private createMenu(event: MouseEvent): void {
    if (this.tetaContextMenu == null) {
      return;
    }
    this._eventPoint = event;
    this._componentRef = this.createContentRef();
    this._componentRef.instance.className = [
      ...ArrayUtil.asArray(this.className),
      'context-menu',
    ];
    this.openChange.emit(true);
  }
}
