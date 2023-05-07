import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';

import { useGifSearch } from '../useGifSearch';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useGifSearch', () => {
  it('fetches gifs successfully', async () => {
    const mockData = [
      { id: '1', title: 'Gif 1' },
      { id: '2', title: 'Gif 2' },
    ];
    mockedAxios.get.mockResolvedValue({ data: { data: mockData } });

    const { result, waitForNextUpdate } = renderHook(() =>
      useGifSearch('test', 0, 10)
    );

    expect(result.current.loading).toBeTruthy();
    await waitForNextUpdate();
    expect(result.current.loading).toBeFalsy();
    expect(result.current.gifs).toEqual(mockData);
  });

  it('handles empty query', () => {
    const { result } = renderHook(() => useGifSearch('', 0, 10));

    expect(result.current.loading).toBeFalsy();
    expect(result.current.gifs).toEqual([]);
  });
});
