import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { bufferCount, tap, throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PickerTouchService {
  step: Observable<number>;

  private touchMove: Observable<TouchEvent>;
  private touchMove$: Subject<TouchEvent> = new Subject<TouchEvent>();
  private step$: Subject<number> = new Subject<number>();

  constructor() {
    this.touchMove = this.touchMove$.asObservable();
    this.step = this.step$.asObservable();

    this.touchMove
      .pipe(
        throttleTime(25),
        bufferCount(2),
        tap((touches: [TouchEvent, TouchEvent]) => {
          const [start, end] = touches.map((_) => _.changedTouches?.item(0));
          const deltaY = start?.clientY - end?.clientY;
          if (deltaY !== 0) {
            const step = deltaY > 0 ? 1 : -1;
            this.step$.next(step);
          }
        })
      )
      .subscribe();
  }

  onTouchMove(event: TouchEvent) {
    this.touchMove$.next(event);
  }
}
