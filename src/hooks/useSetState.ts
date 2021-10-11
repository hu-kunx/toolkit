import {useCallback} from 'react';
import {useRefObject} from './useRefObject';
import {useSafeState} from './useSafeState';

/**
 * 以合并的方式更新state, 组件卸载时不更新
 * @param defaultValue 
 */
export function useSetState<T extends Record<string, unknown>>(defaultValue: T | (() => T)) {
  const [state, setState] = useSafeState(defaultValue);
  const dataRef = useRefObject<T>(state);

  // 仅在组件未卸载的时候更新状态
  const mergeState = useCallback((partValue: Partial<T> | ((value: T) => Partial<T> | T)) => {
    const newState = typeof partValue === 'function' ? partValue(dataRef.current) : partValue;
    setState(Object.assign({}, dataRef.current, newState));
  }, []);

  // // 仅在组件未卸载的时候更新状态
  // const updateWithKey = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
  //   setState(Object.assign({}, dataRef.current, {[key]: value}));
  // }, []);
  return [state, mergeState] as const;
}
