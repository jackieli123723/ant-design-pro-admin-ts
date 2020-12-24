import { renderHook } from '@testing-library/react-hooks';
import useCounter, { Paramsoption } from './index';
//act, renderHook
const props: Paramsoption = {
  initialValue: 100,
  ms: 500,
};

const setUp = () => renderHook(() => useCounter(props));

describe('hooks useCounter render', (): void => {
  it('should init counter', () => {
    const { result } = setUp();
    const { count } = result.current;
    expect(count).toEqual(100);
  });

  // it('should max, min, actions work', () => {
  //   const { result } = setUp();
  //   const [current, { inc, dec, reset, set }] = result.current;
  //   expect(current).toEqual(10);
  //   act(() => {
  //     inc(1);
  //   });
  //   expect(result.current[0]).toEqual(10);
  //   act(() => {
  //     dec(100);
  //   });
  //   expect(result.current[0]).toEqual(1);
  //   act(() => {
  //     inc();
  //   });
  //   expect(result.current[0]).toEqual(2);
  //   act(() => {
  //     reset();
  //   });
  //   expect(result.current[0]).toEqual(10);
  //   act(() => {
  //     set(-1000);
  //   });
  //   expect(result.current[0]).toEqual(1);
  //   act(() => {
  //     set((c) => c + 2);
  //   });
  //   expect(result.current[0]).toEqual(3);

  //   act(() => {
  //     inc();
  //     inc();
  //     inc();
  //   });
  //   expect(result.current[0]).toEqual(6);
  // });
});
