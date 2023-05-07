import { render, fireEvent, waitFor } from '@testing-library/react';

import { SearchInput } from '../SearchInput';
import { useQueryParams } from '../../../hooks/useQueryParams';

jest.mock('../../../hooks/useQueryParams');

const mockedUseQueryParams = useQueryParams as jest.MockedFunction<
  typeof useQueryParams
>;

describe('SearchInput', () => {
  beforeEach(() => {
    mockedUseQueryParams.mockReturnValue({
      searchParams: new URLSearchParams(),
      setQueryParam: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders an input element', () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    const inputElement = getByPlaceholderText('Enter search term...');
    expect(inputElement).toBeInTheDocument();
  });

  it('updates search term on input change', () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    const inputElement = getByPlaceholderText(
      'Enter search term...'
    ) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'cats' } });
    expect(inputElement.value).toBe('cats');
  });

  it('calls setQueryParam with debounced search term', async () => {
    const { getByPlaceholderText } = render(<SearchInput />);
    const inputElement = getByPlaceholderText(
      'Enter search term...'
    ) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: 'cats' } });

    await waitFor(() => {
      expect(mockedUseQueryParams().setQueryParam).toHaveBeenCalledWith(
        'q',
        'cats'
      );
    });
  });
});
