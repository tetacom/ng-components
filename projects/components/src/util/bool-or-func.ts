import { isFunction } from './is-function';

export function boolOrFuncCallback<M>(
  variable: boolean | ((row: M | undefined) => boolean)
) {
  return (args: M) => {
    if (typeof variable === 'boolean') {
      return variable;
    } else if (isFunction(variable)) {
      return (variable as (row: M) => boolean)(args);
    }
    return true;
  };
}
