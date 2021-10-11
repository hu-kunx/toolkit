import {MutableRefObject, useRef} from 'react';

export function useRefObject<T>(source: T): MutableRefObject<T> {
  const ref = useRef<T>(source);
  ref.current = source;
  return ref;
}
