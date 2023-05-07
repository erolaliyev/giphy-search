import { renderHook, act } from '@testing-library/react-hooks';
import { MemoryRouter } from 'react-router-dom';

import { useQueryParams } from '../useQueryParams';

describe('useQueryParams', () => {
  it('should read and update query params', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <MemoryRouter initialEntries={['/path?key=value']}>
        {children}
      </MemoryRouter>
    );

    const { result } = renderHook(() => useQueryParams(), { wrapper });

    expect(result.current.searchParams.get('key')).toBe('value');

    act(() => {
      result.current.setQueryParam('key', 'newValue');
    });

    expect(result.current.searchParams.get('key')).toBe('newValue');
  });
});
