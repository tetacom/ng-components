import {Pipe, PipeTransform} from '@angular/core';
import {formatNumber} from '../util/number-helper';

@Pipe({
  name: 'tetaNumber'
})
export class NumberPipe implements PipeTransform {
  transform(value: number,
            decimalLength: number = 2,
            chunkDelimiter: string = '',
            decimalDelimiter: string = '.',
            chunkLength: number = 3): string {
    if (value === null || value === undefined) {
      return '';
    }
    if (value !== value / 1) {
      return value.toString();
    }
    value /= 1;
    return formatNumber(value,
      decimalLength,
      chunkDelimiter,
      decimalDelimiter,
      chunkLength);
  }
}
