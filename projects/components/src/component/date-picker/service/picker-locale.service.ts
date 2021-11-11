import {Injectable} from '@angular/core';
import {PickerLocaleModel} from '../model/picker-locale-model';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PickerLocaleService {
  private _defaults = new PickerLocaleModel({
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'],
    monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today'
  });

  public locale: BehaviorSubject<PickerLocaleModel> = new BehaviorSubject<PickerLocaleModel>(this._defaults);

  public setLocale(locale: PickerLocaleModel) {
    this.locale.next(locale);
  }

  constructor() {
  }
}
