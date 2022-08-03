import {Filter, IdName, LabelValue} from '../types';

export function toLabelValue<T, K1 extends keyof T, K2 extends Filter<keyof T, K1>>(
  source: T[],
  labelKey: K1,
  valueKey: K2
): (Omit<T, K1 | K2> & LabelValue)[] {
  return source.map(val => {
    // @ts-ignore
    if (Array.isArray(val.children) && val.children.length > 0) {
      return {
        label: val[labelKey] as unknown as string,
        value: val[valueKey] as unknown as string,
        // @ts-ignore
        children: toLabelValue(val.children, labelKey, valueKey),
      };
    }
    return {
      label: val[labelKey] as unknown as string,
      value: val[valueKey] as unknown as string,
    };
  }) as (Omit<T, K1 | K2> & LabelValue)[];
}

export function toIdName<T, K1 extends keyof T, K2 extends Filter<keyof T, K1>>(
  source: T[],
  idKey: K1,
  nameKey: K2
): (Omit<T, K1 | K2> & IdName)[] {
  return source.map(val => ({
    id: val[idKey] as unknown as string,
    name: val[nameKey] as unknown as string,
  })) as (Omit<T, K1 | K2> & IdName)[];
}
