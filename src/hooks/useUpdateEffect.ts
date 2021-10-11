import { useEffect, useRef } from "react";

// 复制于 https://github1s.com/alibaba/hooks/blob/HEAD/packages/hooks/src/useUpdateEffect/index.ts#L1-L16
export const useUpdateEffect: typeof useEffect = (effect, deps) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      return effect();
    }
  }, deps);
};
