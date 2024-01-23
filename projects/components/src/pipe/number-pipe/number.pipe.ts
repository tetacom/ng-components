import {Pipe, PipeTransform} from '@angular/core';
import {formatNumber} from '../util/number-helper';

@Pipe({
    name: 'tetaNumber',
    standalone: true
})
export class NumberPipe implements PipeTransform {
  transform(value: number | string,
            decimalLength: number = 2,
            chunkDelimiter: string = '',
            decimalDelimiter: string = '.',
            chunkLength: number = 3): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }
    if (typeof value === 'string' && isNaN(parseFloat(value))) {
      return value.toString();
    }
    if (decimalLength === null) {
      return value.toString();
    }
    value = Number(value);
    return formatNumber(value,
      decimalLength,
      chunkDelimiter,
      decimalDelimiter,
      chunkLength);
  }
}
