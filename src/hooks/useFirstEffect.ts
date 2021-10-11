import {EffectCallback, useEffect} from 'react';

/**
 * 组件首次渲染
 * @param effectFn 
 */
export function useFirstEffect(effectFn: EffectCallback) {
  useEffect(effectFn, []);
}
