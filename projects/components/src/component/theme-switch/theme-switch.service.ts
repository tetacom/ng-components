import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitchService {
  theme: Observable<boolean>;
  private theme$: BehaviorSubject<boolean>;

  constructor() {
    const value = this.restoreTheme();
    this.theme$ = new BehaviorSubject<boolean>(value);
    this.theme = this.theme$.asObservable();
  }

  switchTheme() {
    const value = !this.theme$.value;
    this.saveTheme(value);
    this.theme$.next(value);
  }

  saveTheme(value: boolean) {
    localStorage.setItem('theme', value.toString());
  }

  restoreTheme(): boolean {
    const theme = localStorage.getItem('theme');
    if (theme) {
      return JSON.parse(theme);
    }
    return true;
  }
}
