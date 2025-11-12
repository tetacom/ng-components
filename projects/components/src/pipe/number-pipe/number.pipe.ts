import { Pipe, PipeTransform } from '@angular/core';
import { formatNumber } from '../util/number-helper';

@Pipe({
  name: 'tetaNumber',
  standalone: true,
})
export class NumberPipe implements PipeTransform {
  transform(
    value: number | string | null | undefined,
    decimalLength = 2,
    isFocused = false,
    chunkDelimiter = '',
    decimalDelimiter = '.',
    chunkLength = 3,
  ): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    if (typeof value === 'string' && isNaN(parseFloat(value))) {
      return value.toString();
    }
    if (decimalLength === null) {
      return value.toString();
    }

    return formatNumber(value, decimalLength, isFocused, chunkDelimiter, decimalDelimiter, chunkLength);
  }
}
