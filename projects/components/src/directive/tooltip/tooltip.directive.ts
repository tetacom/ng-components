import { DOCUMENT } from '@angular/common';
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
import { merge } from 'rxjs';
import { filter, takeWhile, tap } from 'rxjs/operators';

import { Align } from '../../common/enum/align.enum';
import { VerticalAlign } from '../../common/enum/vertical-align.enum';
import { ClickService } from '../../common/service/click.service';
import { DynamicComponentService } from '../../common/service/dynamic-component.service';
import { DomUtil } from '../../common/util/dom-util';
import { PositionUtil } from '../../common/util/position-util';
import { DynamicContentBaseDirective } from '../dynamic-content-base.directive';

@Directive({
  selector: '[tetaTooltip]',
  standalone: true,
})
export class TooltipDirective extends DynamicContentBaseDirective implements OnDestroy, OnInit {
  /**
   * Строка, шаблон или компонент для создания контекстного меню
   */
  @Input() tetaTooltip?: string | TemplateRef<any> | Type<any> | null | undefined = null;
  @Input() override align: Align = Align.center;
  @Input() override verticalAlign: VerticalAlign = VerticalAlign.top;
  private _componentRect: any;

  get _dynamicContent() {
    return this.tetaTooltip;
  }

  constructor(
    @Inject(DOCUMENT)
    protected override _document: any,
    protected override _elementRef: ElementRef,
    protected override _service: DynamicComponentService,
    protected override _injector: Injector,
    protected override _zone: NgZone,
    protected override _cdr: ChangeDetectorRef,
    private _click: ClickService,
  ) {
    super(_document, _elementRef, _service, _injector, _zone, _cdr);
  }

  @HostListener('click', ['$event'])
  showContent(event: MouseEvent): void {
    event.preventDefault();
    this.createTooltip();
  }

  ngOnInit() {
    merge(this._click.click, this._click.contextMenu)
      .pipe(
        takeWhile(() => this._alive),
        filter(() => this._open),
        filter(() => this._componentRef != null),
        filter((event: MouseEvent) => !DomUtil.clickedInside(this._elementRef.nativeElement, event)),
        filter((event: MouseEvent) => !DomUtil.clickedInside(this._componentRef?.location.nativeElement, event)),
        tap((_) => this.destroyContentRef()),
      )
      .subscribe();
  }

  protected setPosition() {
    if (this._componentRef && this._open) {
      if (!this._componentRect) {
        this._componentRect = this._componentRef.location.nativeElement.getBoundingClientRect();
      }
      const containerPosition = this._elementRef.nativeElement.getBoundingClientRect();
      const position = PositionUtil.getPosition(
        containerPosition,
        this._componentRect,
        this.align,
        this.verticalAlign,
        0,
        12,
      );
      PositionUtil.setElementPosition(this._componentRef.location.nativeElement, position);
      const verticalClass = containerPosition.top < position.top ? 'tooltip_bottom' : 'tooltip_top';
      this._componentRef.instance.addClass(verticalClass);
    }
  }

  private createTooltip(): void {
    this._componentRef = this.createContentRef('tooltip');
  }
}
