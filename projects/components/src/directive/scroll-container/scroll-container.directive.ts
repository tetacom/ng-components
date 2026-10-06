import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ApplicationRef,
  booleanAttribute,
  ComponentRef,
  createComponent,
  Directive,
  ElementRef,
  EnvironmentInjector,
  inject,
  Input,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { ScrollBarsComponent } from './scroll-bars.component';

/** Decorates an existing scroll container, including a CDK virtual viewport. */
@Directive({
  selector: '[tetaScrollContainer]',
  host: {
    class: 'teta-scroll-container',
    '[class.teta-scroll-container-always]': 'showScrollbars',
  },
})
export class ScrollContainerDirective implements AfterViewInit, OnDestroy {
  @Input({ transform: booleanAttribute }) showScrollbars = false;

  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly renderer = inject(Renderer2);
  private readonly zone = inject(NgZone);
  private readonly application = inject(ApplicationRef);
  private readonly environment = inject(EnvironmentInjector);
  private readonly platform = inject(PLATFORM_ID);
  private bars?: ComponentRef<ScrollBarsComponent>;
  private removePointerDown?: () => void;
  private removeClick?: () => void;
  private stopClipping?: () => void;
  private addedTabIndex = false;
  private endDrag?: () => void;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platform)) {
      return;
    }

    if (!this.element.hasAttribute('tabindex')) {
      this.renderer.setAttribute(this.element, 'tabindex', '0');
      this.addedTabIndex = true;
    }

    this.bars = createComponent(ScrollBarsComponent, { environmentInjector: this.environment });
    this.application.attachView(this.bars.hostView);
    this.renderer.appendChild(this.element, this.bars.location.nativeElement);
    this.bars.changeDetectorRef.detectChanges();
    this.zone.runOutsideAngular(() => {
      this.stopClipping = this.observeClipping();
      this.removePointerDown = this.renderer.listen(this.bars.location.nativeElement, 'pointerdown', this.startDrag);
      this.removeClick = this.renderer.listen(this.bars.location.nativeElement, 'click', (event: Event) =>
        event.stopPropagation(),
      );
    });
  }

  ngOnDestroy(): void {
    this.endDrag?.();
    this.removePointerDown?.();
    this.removeClick?.();
    this.stopClipping?.();
    if (this.addedTabIndex) {
      this.renderer.removeAttribute(this.element, 'tabindex');
    }
    if (this.bars) {
      this.application.detachView(this.bars.hostView);
      this.renderer.removeChild(this.element, this.bars.location.nativeElement);
      this.bars.destroy();
    }
  }

  private observeClipping(): () => void {
    const document = this.element.ownerDocument;
    const view = document.defaultView;
    let frame: number | undefined;
    const schedule = () => {
      if (frame === undefined) {
        frame = view.requestAnimationFrame(() => {
          frame = undefined;
          this.updateClipping();
        });
      }
    };
    const onScroll = (event: Event) => {
      const target = event.target;
      if (target === document || (target instanceof Element && target.contains(this.element))) {
        schedule();
      }
    };
    document.addEventListener('scroll', onScroll, { capture: true, passive: true });
    view.addEventListener('resize', schedule, { passive: true });
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(schedule);
    for (let ancestor: HTMLElement = this.element; ancestor; ancestor = ancestor.parentElement) {
      observer?.observe(ancestor);
    }
    observer?.observe(this.bars.location.nativeElement);
    this.updateClipping();
    return () => {
      document.removeEventListener('scroll', onScroll, true);
      view.removeEventListener('resize', schedule);
      observer?.disconnect();
      if (frame !== undefined) view.cancelAnimationFrame(frame);
    };
  }

  private updateClipping(): void {
    const layer = this.bars.location.nativeElement as HTMLElement;
    const rect = layer.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const view = this.element.ownerDocument.defaultView;
    let top = Math.max(rect.top, 0);
    let left = Math.max(rect.left, 0);
    let bottom = Math.min(rect.bottom, view.innerHeight);
    let right = Math.min(rect.right, view.innerWidth);
    for (let ancestor = this.element.parentElement; ancestor; ancestor = ancestor.parentElement) {
      const style = view.getComputedStyle(ancestor);
      const paint = /\b(paint|strict|content)\b/.test(style.contain);
      const clipX = paint || /^(auto|scroll|hidden|clip)$/.test(style.overflowX);
      const clipY = paint || /^(auto|scroll|hidden|clip)$/.test(style.overflowY);
      if (!clipX && !clipY) continue;
      const bounds = ancestor.getBoundingClientRect();
      const scaleX = ancestor.offsetWidth ? bounds.width / ancestor.offsetWidth : 1;
      const scaleY = ancestor.offsetHeight ? bounds.height / ancestor.offsetHeight : 1;
      const x = bounds.left + ancestor.clientLeft * scaleX;
      const y = bounds.top + ancestor.clientTop * scaleY;
      if (clipX) {
        left = Math.max(left, x);
        right = Math.min(right, x + ancestor.clientWidth * scaleX);
      }
      if (clipY) {
        top = Math.max(top, y);
        bottom = Math.min(bottom, y + ancestor.clientHeight * scaleY);
      }
    }
    // Percentages also work when a containing ancestor scales the fixed layer.
    const percent = (value: number, size: number) => `${Math.min(100, Math.max(0, (value / size) * 100))}%`;
    const clip =
      bottom <= top || right <= left
        ? 'inset(100%)'
        : `inset(${percent(top - rect.top, rect.height)} ${percent(rect.right - right, rect.width)} ${percent(rect.bottom - bottom, rect.height)} ${percent(left - rect.left, rect.width)})`;
    if (layer.style.clipPath !== clip) this.renderer.setStyle(layer, 'clip-path', clip);
  }

  private readonly startDrag = (event: PointerEvent): void => {
    const target = event.target as HTMLElement;
    const trackClick = target.classList.contains('teta-scroll-track');
    if (
      event.button !== 0 ||
      event.isPrimary === false ||
      (!trackClick && !target.classList.contains('teta-scroll-thumb'))
    ) {
      return;
    }
    const thumb = trackClick ? (target.firstElementChild as HTMLElement) : target;

    event.preventDefault();
    event.stopPropagation();
    this.endDrag?.();

    const vertical = thumb.parentElement.classList.contains('teta-scroll-track-y');
    const track = thumb.parentElement.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    const travel = vertical ? track.height - thumbRect.height : track.width - thumbRect.width;
    const range = vertical
      ? this.element.scrollHeight - this.element.clientHeight
      : this.element.scrollWidth - this.element.clientWidth;
    if (travel <= 0 || range <= 0) {
      return;
    }

    const start = vertical ? event.clientY : event.clientX;
    let initialScroll = vertical ? this.element.scrollTop : this.element.scrollLeft;
    const rtl = !vertical && this.element.ownerDocument.defaultView.getComputedStyle(this.element).direction === 'rtl';
    if (trackClick) {
      const offset = start - (vertical ? track.top : track.left) - (vertical ? thumbRect.height : thumbRect.width) / 2;
      const progress = Math.max(0, Math.min(1, offset / travel));
      initialScroll = (rtl ? progress - 1 : progress) * range;
      this.element.scrollTo({ [vertical ? 'top' : 'left']: initialScroll, behavior: 'instant' });
    }
    thumb.setPointerCapture(event.pointerId);
    this.renderer.addClass(this.element, 'teta-scroll-container-dragging');

    const removeMove = this.renderer.listen(thumb, 'pointermove', (move: PointerEvent) => {
      if (move.pointerId !== event.pointerId) {
        return;
      }
      const delta = (vertical ? move.clientY : move.clientX) - start;
      const position = initialScroll + (delta * range) / travel;
      this.element.scrollTo({
        [vertical ? 'top' : 'left']: Math.max(rtl ? -range : 0, Math.min(rtl ? 0 : range, position)),
        behavior: 'instant',
      });
    });
    const finish = (end: PointerEvent) => {
      if (end.pointerId === event.pointerId) {
        this.endDrag?.();
      }
    };
    const removeUp = this.renderer.listen(thumb, 'pointerup', finish);
    const removeCancel = this.renderer.listen(thumb, 'pointercancel', finish);
    const removeCapture = this.renderer.listen(thumb, 'lostpointercapture', finish);
    const removeContextMenu = this.renderer.listen(thumb, 'contextmenu', () => this.endDrag?.());
    this.endDrag = () => {
      this.endDrag = undefined;
      removeMove();
      removeUp();
      removeCancel();
      removeCapture();
      removeContextMenu();
      if (thumb.hasPointerCapture(event.pointerId)) {
        thumb.releasePointerCapture(event.pointerId);
      }
      this.renderer.removeClass(this.element, 'teta-scroll-container-dragging');
    };
  };
}
