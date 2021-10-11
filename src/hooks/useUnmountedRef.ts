import {MutableRefObject, useEffect, useRef} from 'react';

/**
 * 组件是否已卸载-本身不触发渲染
 * @date 2021/8/20
 */
export function useUnmountedRef(): MutableRefObject<boolean> {
  const ref = useRef<boolean>(false);
  useEffect(() => {
    ref.current = false;
    return () => {
      ref.current = true;
    };
  }, []);
  return ref;
}

// 组件是否还在挂载中
export function useIsMountedRef(): MutableRefObject<boolean> {
  const ref = useRef<boolean>(true);
  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);
  return ref;
}

// 组件是否还在挂载中
interface MountStatus {
  status: 'mounted' | 'unmounted';
  isMounted: () => boolean;
  isUnMounted: () => boolean;
}
export function useMountStatusRef(): MutableRefObject<MountStatus> {
  const ref = useRef<MountStatus>({isMounted: () => true, status: 'mounted', isUnMounted: () => false});
  useEffect(() => {
    ref.current.status = 'mounted';
    return () => {
      ref.current.status = 'unmounted';
    };
  }, []);
  ref.current.isMounted = () => ref.current.status === 'mounted';
  ref.current.isUnMounted = () => ref.current.status === 'mounted';
  return ref;
}
