import { useState, useRef, useCallback } from 'react';

export interface Outoption {
  count: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export interface Paramsoption {
  initialValue: number;
  ms: number;
}
//initialValue: number = 0, ms: number = 500
//调用hooks用不起效果？
function useCounter(props: Paramsoption): Outoption {
  // console.log('useCounter');
  const [count, setCount] = useState(props.initialValue);
  const intervalRef = useRef<number | null>(null); //useRef<Function>(() => {});?
  const start = useCallback(() => {
    if (intervalRef.current !== null) {
      return;
    }
    if (intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        setCount((c) => c + 1);
      }, props.ms);
    }
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    window.clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);
  const reset = useCallback(() => {
    setCount(0);
  }, []);
  return { count, start, stop, reset };
}

export default useCounter;

//注意 type 可以返回 【】 interface 只能返回对象 https://stackoverflow.com/questions/25469244/how-can-i-define-an-interface-for-an-array-of-objects-with-typescript
/* eslint-disable */
// import { useCallback, useEffect, useRef } from 'react';

// export type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

// export default function useTimeoutFn(fn: Function, ms: number = 0): UseTimeoutFnReturn {
//   const ready = useRef<boolean | null>(false);
//   const timeout = useRef<ReturnType<typeof setTimeout>>();
//   const callback = useRef(fn);

//   const isReady = useCallback(() => ready.current, []);

//   const set = useCallback(() => {
//     ready.current = false;
//     timeout.current && clearTimeout(timeout.current);

//     timeout.current = setTimeout(() => {
//       ready.current = true;
//       callback.current();
//     }, ms);
//   }, [ms]);

//   const clear = useCallback(() => {
//     ready.current = null;
//     timeout.current && clearTimeout(timeout.current);
//   }, []);

//   // update ref when function changes
//   useEffect(() => {
//     callback.current = fn;
//   }, [fn]);

//   // set on mount, clear on unmount
//   useEffect(() => {
//     set();

//     return clear;
//   }, [ms]);

//   return [isReady, clear, set];
// }

// import useTimeoutFn from './useTimeoutFn';
// import useUpdate from './useUpdate';

// export type UseTimeoutReturn = [() => boolean | null, () => void, () => void];

// export default function useTimeout(ms: number = 0): UseTimeoutReturn {
//   const update = useUpdate();

//   return useTimeoutFn(update, ms);
// }
