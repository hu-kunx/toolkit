// value enum values
export type ValueOf<T> = T[keyof T];
export type Filter<T, U> = T extends U ? never : T;
export type LabelValue = {label: string; value: string};
export type IdName = {id: string; name: string};
