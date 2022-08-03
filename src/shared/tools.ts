import qs, {ParsedQuery} from 'query-string';
import {ValueOf} from '../types';

/**
 * @function 获取 url 上的参数
 * @param url
 */
export function getParams(url: string): ParsedQuery {
  return qs.parseUrl(url).query;
}

/**
 * @function 数字的前置 0 填充
 * @deprecated 直接使用 string.padStart 更好些
 * @param n {number}
 * @return string
 */
export function padZero(n: number): string {
  const s = n.toString();
  return s.padStart ? s.padStart(2, '0') : s.length > 1 ? s : '0' + s;
}

/**
 * @function 获取数据的类型
 * @param target {*}
 * @return string
 */
export function typeOf(target: unknown): string {
  return Object.prototype.toString.call(target).match(/[A-Z][a-z]+/g)![0];
}

/**
 * @function 文件大小换算
 * @param size {number} 字节
 * @param digits {number} 几位小数点 默认2
 * @return string
 */
export function fileSize(size: number, digits = 2): string {
  if (size < 1024) {
    return size.toFixed(digits) + 'byte';
  }
  if (size < 1048576) {
    return (size / 1024).toFixed(digits) + 'Kib';
  }
  if (size < 1073741824) {
    return (size / 1048576).toFixed(digits) + 'Mib';
  }
  if (size < 1099511627776) {
    return (size / 1073741824).toFixed(digits) + 'Gib';
  }
  if (size < 1125899906842624) {
    return (size / 1099511627776).toFixed(digits) + 'Tib';
  }
  // 1024Pib = 1152921504606846976byte
  return (size / 1125899906842624).toFixed(digits) + 'Pib';
}

/**
 * 交换数组两个索引数据位置
 * @description 直接修改原数组也就是说是不是纯函数
 * @date 2021/9/22
 */
export function swap<T>(array: T[], x: number, y: number): T[] {
  const temp = array[x];
  array[x] = array[y];
  array[y] = temp;
  return array;
}
