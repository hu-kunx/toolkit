import {ValueOf} from '../types';

/**
 * 规范化 pathname
 * @description 去掉多余的 / , 前面添加尾部去掉: /a/b/c
 * @param path string
 * @return string
 * @date 2021/9/3
 */
export function normalizePathname(path: string): string {
  return `//${path}//`.replace(/\/+/g, '/').replace(/\/$/, '').normalize();
}

/**
 * 取字符串枚举的 Values
 * @description 字符串枚举不会生成反向的value,所以直接取values
 * @param value
 * @return []
 * @date 2021/9/22
 */
export function stringEnumValueOf<T extends Record<string, string>>(value: T): ValueOf<T>[] {
  return Object.values(value) as unknown as ValueOf<T>[];
}
