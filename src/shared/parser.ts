/**
 * 安全解析json
 * @date 2021/9/22
 */
export function safeParserJSON<T>(str: string, defaultValue: T): T {
  try {
    if (!str || typeof str !== 'string') {
      return defaultValue;
    }
    return JSON.parse(str);
  } catch (e) {
    return defaultValue;
  }
}
