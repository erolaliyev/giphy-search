import { renderHook, act } from '@testing-library/react-hooks';

import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('returns the initial value', () => {
    const { result } = renderHook(() => useDebounce('test', 500));
    expect(result.current).toBe('test');
  });

  it('updates the debounced value after the delay', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'test1', delay: 500 },
      }
    );

    rerender({ value: 'test2', delay: 500 });
    act(() => {
      jest.runAllTimers();
    });

    expect(result.current).toBe('test2');
  });

  it('does not update the debounced value within the delay period', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: 'test1', delay: 500 },
      }
    );

    rerender({ value: 'test2', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(result.current).toBe('test1');
  });
});
