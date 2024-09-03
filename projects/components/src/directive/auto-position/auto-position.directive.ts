import { AfterViewInit, Directive, ElementRef, HostBinding, Input, NgZone, OnDestroy } from '@angular/core';
import { Align } from '../../common/enum/align.enum';
import { VerticalAlign } from '../../common/enum/vertical-align.enum';
import { IRect } from '../../common/contract/i-rect';
import { DomUtil } from '../../common/util/dom-util';
import { PositionUtil } from '../../common/util/position-util';
import { takeWhile } from 'rxjs/operators';

@Directive({
  selector: '[tetaAutoPosition]',
  standalone: true,
})
export class AutoPositionDirective implements AfterViewInit, OnDestroy {
  @Input() align: Align;
  @Input() verticalAlign: VerticalAlign = VerticalAlign.auto;

  @HostBinding('style.position') fixed = 'fixed';

  private _alive = true;

  constructor(private _elementRef: ElementRef, private _zone: NgZone) {}

  ngAfterViewInit() {
    this.setPosition();
    this._zone.onStable.pipe(takeWhile(() => this._alive)).subscribe(() => {
      this.setPosition();
    });
  }

  ngOnDestroy() {
    this._alive = false;
  }

  private setPosition(): void {
    const target = this._elementRef.nativeElement;
    const containerPosition = this._elementRef.nativeElement.parentElement.getBoundingClientRect();
    const targetPosition = target.getBoundingClientRect();

    const rect: IRect = {
      bottom: containerPosition.bottom,
      top: containerPosition.top,
      left: containerPosition.left,
      right: containerPosition.right,
    };

    const targetRect: IRect = {
      bottom: targetPosition.bottom,
      top: targetPosition.top,
      left: targetPosition.left,
      right: targetPosition.right,
    };

    const targetTransformedParent = DomUtil.findTransformedParent(target);
    let parentPosition = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    };
    if (targetTransformedParent) {
      parentPosition = targetTransformedParent.getBoundingClientRect();
    }

    const position = PositionUtil.getPosition(rect, targetRect, this.align, this.verticalAlign, 0, 0, parentPosition);

    PositionUtil.setElementPosition(target, position);
  }
}
