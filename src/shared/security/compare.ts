/**
 * 时间恒定的比较函数
 * @param {string} a
 * @param {string} b
 * @return {boolean}
 */
export function safeStringCompare2(a: string, b: string): boolean {
  const bt1 = [...a].map(v => v.charCodeAt(0));
  const bt2 = [...b].map(v => v.charCodeAt(0));
  let diff = bt1.length ^ bt2.length;
  for (let i = 0; i < bt1.length && i < bt2.length; i++) diff |= bt1[i] ^ bt2[i];
  return diff === 0;
}

/**
 * 恒定时间的比较算法
 * @param {string} cipher1
 * @param {string} cipher2
 * @return {Boolean}
 */
export function safeStringCompare(cipher1: string, cipher2: string): boolean {
  // eslint-disable-next-line
  let right = 0;
  let wrong = 0;
  for (let i = 0, k = cipher1.length; i < k; ++i) {
    if (cipher1.charCodeAt(i) === cipher2.charCodeAt(i)) {
      ++right;
    } else {
      ++wrong;
    }
  }
  return wrong === 0;
}
