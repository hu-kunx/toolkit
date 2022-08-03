/**
 * to 16 进制的字符串形式
 * @param num {Number}
 * @returns {string}
 * @todo 负数
 */
 export function toHex(num: number): string {
  if (typeof num !== "number") return "";
  const bytes = "0123456789ABCDEF";
  const result = [];
  if (num < 10) {
    return "0x0" + num;
  }
  while (num !== 0) {
    result.push(bytes[num % 16]);
    num = Math.floor(num / 16);
  }
  return "0x" + result.reverse().join("");
}