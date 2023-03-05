import {isPromise} from './is';

/**
 * 等待一段时间
 * node.js 环境应该使用 await setTimeout 方法
 * @date 2021/9/22
 */
export function waitFor(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 延时执行
export function delay(callback: () => void, ms: number) {
  setTimeout(callback, ms);
}

type ConsistencyFn<T extends (...args: any) => any> = (...args: Parameters<T>) => ReturnType<T> | Promise<null>;

// 数据请求最终一致性, 多次调用异步函数，只有最后一次调用其值是有效的，无效返回 NULL
export function asyncDebounce<T extends (...args: any) => any>(fn: T): ConsistencyFn<T> {
  const callId = {current: 0};
  return (...args: Parameters<T>) => {
    callId.current += 1;
    const id = callId.current;
    const result = fn.apply(null, args);
    if (isPromise(result)) {
      return result.then(fnResult => {
        if (id === callId.current) return fnResult;
        return null;
      });
    }
    return result;
  };
}

// 防抖
export function debounce<T extends (...args: any) => void>(callback: T, wait: number): T {
  let timer: NodeJS.Timeout | null = null;
  return function (...args) {
    // @ts-ignore
    const context = this;
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      callback.apply(context, args);
    }, wait);
  } as T;
}

// 节流
export function throttle<T extends (...args: any) => void>(callback: T, threshhold: number): T {
  let timeout: NodeJS.Timeout | null = null; // 保证第一次就会被调用
  let lastTime = 0;
  return function (...args) {
    let curr = Date.now();
    // @ts-ignore
    const context = this;
    if (timeout !== null) clearTimeout(timeout);
    if (curr - lastTime >= threshhold) {
      callback.apply(context, args);
      lastTime = curr;
    } else {
      timeout = setTimeout(() => {
        callback.apply(context, args);
      }, threshhold);
    }
  } as T;
}
