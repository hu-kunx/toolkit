import dayjs, {Dayjs} from 'dayjs';

type Time = Date | string | number | Dayjs;

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
export function getWeekNumber(date?: Time): 1 | 2 | 3 | 4 | 5 | 6 | 7 {
  const y = dayjs(date).year();
  const m = dayjs(date).month() + 1;
  const d = dayjs(date).date();

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
export function getMonthAllDate(param: Time): 28 | 29 | 30 | 31 {
  const date = dayjs(param);
  const month = date.month() + 1;
  const year = date.year();
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
export function getWeekDate(date: Time): [Date, Date] {
  const today = dayjs(date);
  const weekDate = today.day();
  let week = today.toDate();
  const st = new Date(week.setDate(week.getDate() - weekDate + 1));
  week = today.toDate();
  const et = new Date(week.setDate(week.getDate() - weekDate + 7));
  return [st, et];
}

// 当前是第几季度
export function getQuarterByMonth(month: number) {
  if (month <= 0 || month > 12) {
    return null;
  }
  const array = [
    {eq: [1, 2, 3], value: 1},
    {eq: [4, 5, 6], value: 2},
    {eq: [7, 8, 9], value: 3},
    {eq: [10, 11, 12], value: 4},
  ];
  return array.find(val => val.eq.includes(month))!.value;
}
