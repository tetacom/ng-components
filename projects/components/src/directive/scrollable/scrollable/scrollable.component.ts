import {
  AfterContentChecked,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  animationFrameScheduler,
  fromEvent,
  Observable,
  shareReplay,
  Subject,
  tap,
} from 'rxjs';
import { map, takeWhile, throttleTime } from 'rxjs/operators';

import { ScrollableDirective } from '../scrollable.directive';
import { NgClass, AsyncPipe } from '@angular/common';
import { LetDirective } from '../../let/let.directive';

type ScrollDimensions = {
  clientHeight: number;
  clientWidth: number;
  scrollHeight: number;
  scrollWidth: number;
};

@Component({
    selector: 'teta-scrollable',
    templateUrl: './scrollable.component.html',
    styleUrls: ['./scrollable.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        LetDirective,
        NgClass,
        AsyncPipe,ScrollableDirective
    ],
})
export class ScrollableComponent
  implements OnInit, OnDestroy, AfterContentChecked
{
  @ContentChild(ScrollableDirective, {
    static: true,
    read: ElementRef,
  })
  private _scrollDirective: ElementRef;

  @ViewChild('scrollableWrapper', {
    static: true,
  })
  private _scrollableWrapper: ElementRef;

  @ViewChild('scrollbarVertical', {
    static: true,
  })
  private _scrollbarVertical: ElementRef;

  @ViewChild('scrollbarHorizontal', {
    static: true,
  })
  private _scrollbarHorizontal: ElementRef;

  @Input() direction: 'row' | 'column' = 'row';
  @Input()
  @HostBinding('class.show-scrollbars')
  showScrollbars = false;

  @Input() contentClass: string | string[];

  @Output() scroll = new EventEmitter<Event>();

  private _scrollSize = new Subject<void>();
  scrollSize: Observable<ScrollDimensions>;

  private _container: ElementRef;
  private _alive = true;
  private _observer: ResizeObserver;

  constructor() {
    this.scrollSize = this._scrollSize.asObservable().pipe(
      throttleTime(100, animationFrameScheduler),
      map(() => {
        return {
          scrollHeight: this._container.nativeElement.scrollHeight,
          scrollWidth: this._container.nativeElement.scrollWidth,
          clientHeight: this._container.nativeElement.clientHeight,
          clientWidth: this._container.nativeElement.clientWidth,
        };
      }),
      shareReplay({
        refCount: true,
        bufferSize: 1,
      })
    );
    this._observer = new ResizeObserver(this._observe);
  }

  private _observe = () => {
    this._scrollSize.next();
  };

  scrollVertical(event) {
    this._container.nativeElement.scrollTop = event.target.scrollTop;
  }

  scrollHorizontal(event) {
    this._container.nativeElement.scrollLeft = event.target.scrollLeft;
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
          this._scrollbarHorizontal.nativeElement.scrollLeft =
            event.target.scrollLeft;
          this._scrollbarVertical.nativeElement.scrollTop =
            event.target.scrollTop;
          this.scroll.emit(event);
        })
      )
      .subscribe();

    this._observer.observe(this._container.nativeElement);
  }

  ngOnDestroy() {
    this._alive = false;
    this._observer.unobserve(this._container.nativeElement);
    this._observer.disconnect();
  }

  ngAfterContentChecked() {
    this._observe();
  }
}
