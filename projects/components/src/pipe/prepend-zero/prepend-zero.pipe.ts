import {Pipe, PipeTransform} from '@angular/core';
import {prependZero} from '../util/number-helper';

@Pipe({
    name: 'tetaPrependZero',
    standalone: true
})
export class PrependZeroPipe implements PipeTransform {
  transform(value: number, length: number): string {
    if (value === null || value === undefined) {
      return '';
    }
    value /= 1;
    return prependZero(value, length);
  }
}
