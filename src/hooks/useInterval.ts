import {useEffect, useRef} from 'react';

type Options = {
  immediate?: boolean;
};

// 复制于: https://github1s.com/alibaba/hooks/blob/HEAD/packages/hooks/src/useInterval/index.ts#L1-L30
export function useInterval(fn: () => void, delay: number | null | undefined, options?: Options): void {
  const immediate = options?.immediate;

  const fnRef = useRef<() => void>();
  fnRef.current = fn;

  useEffect(() => {
    if (delay === undefined || delay === null) return;
    if (immediate) {
      fnRef.current?.();
    }
    const timer = setInterval(() => {
      fnRef.current?.();
    }, delay);
    return () => {
      clearInterval(timer);
    };
  }, [delay]);
}
