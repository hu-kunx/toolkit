import {useUnmountedRef} from './useUnmountedRef';
import {Dispatch, SetStateAction, useCallback, useState} from 'react';

/** 如果组件已经卸载则不再更新 state */
export function useSafeState<S>(initialState: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
  const unmountedRef = useUnmountedRef();
  const [state, setState] = useState(initialState);
  const setCurrentState = useCallback((value: SetStateAction<S>) => {
    if (!unmountedRef.current) {
      setState(value);
    }
  }, []);
  return [state, setCurrentState];
}
