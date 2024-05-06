import { inject, InjectionToken } from '@angular/core';
import { Observable, share } from 'rxjs';
import { DOCUMENT } from '@angular/common';

export const ANIMATION_FRAME = new InjectionToken<Observable<DOMHighResTimeStamp>>(
  'Shared Observable based on `window.requestAnimationFrame`',
  {
    factory: () => {
      const { requestAnimationFrame, cancelAnimationFrame } = inject(WINDOW);
      const animationFrame$ = new Observable<DOMHighResTimeStamp>((subscriber) => {
        let id = NaN;
        const callback = (timestamp: DOMHighResTimeStamp) => {
          subscriber.next(timestamp);
          id = requestAnimationFrame(callback);
        };

        id = requestAnimationFrame(callback);

        return () => {
          cancelAnimationFrame(id);
        };
      });

      return animationFrame$.pipe(share());
    },
  }
);

export const WINDOW = new InjectionToken<Window>('An abstraction over global window object', {
  factory: () => {
    const { defaultView } = inject(DOCUMENT);

    if (!defaultView) {
      throw new Error('Window is not available');
    }

    return defaultView;
  },
});
