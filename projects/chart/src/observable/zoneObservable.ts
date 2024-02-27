import {NgZone} from '@angular/core';
import {MonoTypeOperatorFunction, Observable, pipe} from 'rxjs';

export function tetaZoneFull<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return source =>
    new Observable(subscriber =>
      source.subscribe({
        next: value => ngZone.run(() => subscriber.next(value)),
        error: (error: unknown) => ngZone.run(() => subscriber.error(error)),
        complete: () => ngZone.run(() => subscriber.complete()),
      }),
    );
}

export function tetaZoneFree<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return source =>
    new Observable(subscriber =>
      ngZone.runOutsideAngular(() => source.subscribe(subscriber)),
    );
}

export function tetaZoneOptimized<T>(ngZone: NgZone): MonoTypeOperatorFunction<T> {
  return pipe(tetaZoneFree(ngZone), tetaZoneFull(ngZone));
}
