import {
  ChangeDetectionStrategy,
  Component, ContentChild,
  ElementRef, EventEmitter, HostBinding, Inject,
  Injector, Input, NgZone, OnDestroy,
  OnInit, Output, ViewChild,
} from '@angular/core';
import {ScrollableDirective} from "../scrollable.directive";
import {ANIMATION_FRAME} from "../../../observable/animation-frame";
import {fromEvent, Observable, tap} from "rxjs";
import {map, takeWhile, throttleTime} from "rxjs/operators";
import {tetaZoneFull} from "../../../observable/zoneObservable";

@Component({
  selector: 'teta-scrollable',
  templateUrl: './scrollable.component.html',
  styleUrls: ['./scrollable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollableComponent implements OnInit, OnDestroy {
  @ContentChild(ScrollableDirective, {
    static: true,
    read: ElementRef
  }) private _scrollDirective: ElementRef;

  @ViewChild('scrollableWrapper', {
    static: true
  }) private _scrollableWrapper: ElementRef

  @ViewChild('scrollbarVertical', {
    static: true
  }) private _scrollbarVertical: ElementRef

  @ViewChild('scrollbarHorizontal', {
    static: true
  }) private _scrollbarHorizontal: ElementRef;

  @Input() direction: 'row' | 'column' = 'row';
  @Input()
  @HostBinding('class.show-scrollbars')
  showScrollbars = false;

  @Input() contentClass: string | string[];

  @Output() scroll = new EventEmitter<Event>();

  scrollSize: Observable<{
    clientHeight: number;
    clientWidth: number;
    scrollHeight: number;
    scrollWidth: number;
  }>;

  private _container: ElementRef;
  private _alive = true;

  constructor(private _elementRef: ElementRef,
              private _injector: Injector,
              private _ngZone: NgZone,
              @Inject(ANIMATION_FRAME) private _animationFrame: Observable<number>) {
    this.scrollSize = this._animationFrame.pipe(
      throttleTime(300),
      map(() => ({
        scrollHeight: this._container.nativeElement.scrollHeight,
        scrollWidth: this._container.nativeElement.scrollWidth,
        clientHeight: this._container.nativeElement.clientHeight,
        clientWidth: this._container.nativeElement.clientWidth,
      })),
      tetaZoneFull(this._ngZone)
    )
  }

  scrollVertical(event) {
    this._container.nativeElement.scrollTop = event.target.scrollTop;
    // this._elementRef.nativeElement.dispatchEvent(event);
    this.scroll.emit(event);
  }

  scrollHorizontal(event) {
    this._container.nativeElement.scrollLeft = event.target.scrollLeft;
    // this._elementRef.nativeElement.dispatchEvent(event);
    this.scroll.emit(event);
  }

  ngOnInit(): void {
    this._container = this._scrollableWrapper;
    if (this._scrollDirective) {
      this._container = this._scrollDirective;
    }

    fromEvent(this._container.nativeElement, 'scroll')
      .pipe(
        takeWhile(() => this._alive),
        tap((event: any) => {
          this._scrollbarHorizontal.nativeElement.scrollLeft = event.target.scrollLeft;
          this._scrollbarVertical.nativeElement.scrollTop = event.target.scrollTop;
          // this._elementRef.nativeElement.dispatchEvent(event);
          this.scroll.emit(event);
        })
      ).subscribe()
  }

  ngOnDestroy() {
    this._alive = false;
  }
}
