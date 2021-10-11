import {useCallback, useReducer} from 'react';

import {useIsMountedRef} from './useUnmountedRef';

/**
 * 触发组件更新
 * @date 2021/8/30
 */
export function useForceUpdate() {
  const isMountedRef = useIsMountedRef();
  const reRender = useReducer((c: number) => (c += 1), 0)[1];
  return useCallback(() => {
    if (isMountedRef.current) {
      reRender();
    }
  }, []);
}
