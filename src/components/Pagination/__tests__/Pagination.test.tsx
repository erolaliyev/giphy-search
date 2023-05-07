import { render, fireEvent } from '@testing-library/react';

import { Pagination } from '../Pagination';
import { useQueryParams } from '../../../hooks/useQueryParams';

jest.mock('../../../hooks/useQueryParams');

const mockedUseQueryParams = useQueryParams as jest.MockedFunction<
  typeof useQueryParams
>;

describe('Pagination', () => {
  beforeEach(() => {
    mockedUseQueryParams.mockReturnValue({
      searchParams: new URLSearchParams(),
      setQueryParam: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct number of buttons for given totalPages', () => {
    const totalPages = 3;
    const { getAllByRole } = render(<Pagination totalPages={totalPages} />);
    const buttons = getAllByRole('button');
    expect(buttons.length).toBe(totalPages);
  });

  it('calls setQueryParam with the correct offset when a page button is clicked', () => {
    const totalPages = 3;
    const { getAllByRole } = render(<Pagination totalPages={totalPages} />);
    const buttons = getAllByRole('button');

    fireEvent.click(buttons[1]);

    expect(mockedUseQueryParams().setQueryParam).toHaveBeenCalledWith(
      'offset',
      1
    );
  });

  it('disables the current page button', () => {
    const totalPages = 3;
    mockedUseQueryParams.mockReturnValue({
      searchParams: new URLSearchParams('offset=1'),
      setQueryParam: jest.fn(),
    });

    const { getAllByRole } = render(<Pagination totalPages={totalPages} />);
    const buttons = getAllByRole('button');

    expect(buttons[0]).not.toBeDisabled();
    expect(buttons[1]).toBeDisabled();
    expect(buttons[2]).not.toBeDisabled();
  });
});
