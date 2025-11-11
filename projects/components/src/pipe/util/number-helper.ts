export const getPrecision = (a: number) => {
  if (!isFinite(a)) {
    return 0;
  }
  let e = 1;
  let p = 0;
  while (Math.round(a * e) / e !== a) {
    e *= 10;
    p++;
  }
  return p;
};

export const formatNumber = (
  value: any,
  decimalLength: number,
  chunkDelimiter: string,
  decimalDelimiter: string,
  chunkLength: number,
): string => {
  const numberValue = Number(value);
  const abs = Math.abs(numberValue);
  if (0 < abs && 1 > abs) {
    const firstDigitIndex = Math.floor(Math.abs(Math.log10(abs)));
    decimalLength += firstDigitIndex;
  }

  let precision = Math.min(getPrecision(numberValue), Math.floor(decimalLength));
  // Пытаемся сохранить количество нулей после запятой для 0
  if (numberValue === 0 && typeof value === 'string') {
    const decimalPart = value.split('.')[1] || '';
    const trailingZerosMatch = decimalPart.match(/0*$/);
    precision = trailingZerosMatch ? trailingZerosMatch[0].length : 0;
  }

  const digitGroupingRegex = '\\d(?=(\\d{' + chunkLength + '})+' + (precision > 0 ? '\\D' : '$') + ')';
  let formattedNumberString = numberValue.toFixed(precision);
  // Учитываем знак минуса для отрицательного нуля
  if (numberValue === 0 && 1 / numberValue === -Infinity) {
    formattedNumberString = '-' + formattedNumberString;
  }

  return (decimalDelimiter ? formattedNumberString.replace('.', decimalDelimiter) : formattedNumberString).replace(
    new RegExp(digitGroupingRegex, 'g'),
    '$&' + chunkDelimiter,
  );
};

export const prependZero = (input: number, length: number) => ('0'.repeat(length) + input).slice(-length);
