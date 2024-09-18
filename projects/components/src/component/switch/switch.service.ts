import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SwitchService {
  readonly value: Observable<any>;
  private readonly value$: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor() {
    this.value = this.value$.asObservable();
  }

  setValue(value: any) {
    this.value$.next(value);
  }
}
