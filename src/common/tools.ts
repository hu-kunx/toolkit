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
 * @function 是否是闰年
 * @param year {number}
 * @return {boolean}
 */
export function isLeapYear(year: number): boolean {
  return year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0);
}

/**
 * @function 一年的第几周
 * @param date TODO: 增加多种类型输入参数
 * @return {number} 1-7
 */
export function getWeekNumber(date?: Date): 1 | 2 | 3 | 4 | 5 | 6 | 7 {
  const y = (date ?? new Date()).getFullYear();
  const m = (date ?? new Date()).getMonth() + 1;
  const d = (date ?? new Date()).getDate();

  const monthDays = [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  function getMonthDays(year: number, month: number) {
    return monthDays[month] || (isLeapYear(year) ? 29 : 28);
  }

  const now = new Date(y, m - 1, d);
  const year = now.getFullYear();
  const month = now.getMonth();
  let days = now.getDate();
  //那一天是那一年中的第多少天
  for (let i = 0; i < month; i++) {
    days += getMonthDays(year, i);
  }
  //那一年第一天是星期几
  const yearFirstDay = new Date(year, 0, 1).getDay() || 7;
  return Math.ceil((days + yearFirstDay) / 7) as 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

/**
 * @function 获取一个月有多少天
 * @param param TODO: 增加多种类型输入参数
 * @return {number} 28 29 30 31
 */
export function getMonthAllDate(param: Date | string): 28 | 29 | 30 | 31 {
  const date = new Date(param);
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
    return 31;
  }
  if ([4, 6, 9, 11].includes(month)) {
    return 30;
  }
  return isLeapYear(year) ? 29 : 28;
}

/**
 * @function 获取一周的起始日期
 * @param date
 * @return {[Date, Date]}
 */
export function getWeekDate(date: Date = new Date()): [Date, Date] {
  const weekDate = date.getDay();
  let week = new Date(date);
  const st = new Date(week.setDate(week.getDate() - weekDate + 1));
  week = new Date(date);
  const et = new Date(week.setDate(week.getDate() - weekDate + 7));
  return [st, et];
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

/**
 * 等待一段时间
 * @description node.js 环境应该使用 setTimeout 方法
 * @date 2021/9/22
 */
export function sleep(time = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time));
}

/**
 * 安全解析json
 * @date 2021/9/22
 */
export function safeParseJSON<T>(jsonString: string | undefined, defaultValue: T): T {
  if (!jsonString) return defaultValue;
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    return defaultValue;
  }
}

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
  return (Object.values(value) as unknown) as ValueOf<T>[];
}
