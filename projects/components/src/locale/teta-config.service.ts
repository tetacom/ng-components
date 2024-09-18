import { Injectable } from '@angular/core';
import { TetaLocalisation } from './teta-localisation';
import { BehaviorSubject } from 'rxjs';
import { enLocale } from './en';

@Injectable({
  providedIn: 'root',
})
export class TetaConfigService {
  private defaultLocale: TetaLocalisation = enLocale;
  private locale$ = new BehaviorSubject<TetaLocalisation>(this.defaultLocale);
  locale = this.locale$.asObservable();

  constructor() {}

  setLocale(newLocale: TetaLocalisation) {
    if (newLocale) {
      this.locale$.next(newLocale);
    } else {
      this.locale$.next(this.defaultLocale);
    }
  }
}
