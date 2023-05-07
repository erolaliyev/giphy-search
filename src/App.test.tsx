import {
  render,
  screen,
  waitFor,
  act,
  fireEvent,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from './App';

jest.doMock('./hooks/useGifSearch', () => ({
  useGifSearch: () => ({
    gifs: [],
    loading: false,
  }),
}));

afterAll(() => {
  jest.dontMock('./hooks/useGifSearch');
});

describe('App', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>{children}</MemoryRouter>
  );

  it('renders without crashing', () => {
    const { container } = render(<App />, { wrapper });
    expect(container).toBeInTheDocument();
  });

  it('should render the SearchInput and show loading text', async () => {
    render(<App />, { wrapper });

    const searchInput = screen.getByRole('textbox');
    expect(searchInput).toBeInTheDocument();

    await act(async () => {
      userEvent.type(searchInput, 'test{enter}');
    });

    return waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  it('should render the GifGrid component when a valid query is provided', async () => {
    render(<App />, { wrapper });

    const searchInput = screen.getByRole('textbox');
    await act(async () => {
      userEvent.type(searchInput, 'test{enter}');
    });

    return waitFor(() => {
      expect(screen.getByTestId('gif-grid')).toBeInTheDocument();
    });
  });

  it('should render the Pagination component when a valid query is provided and the number of gifs is greater than GIFS_PER_PAGE', async () => {
    render(<App />, { wrapper });

    const searchInput = screen.getByRole('textbox');
    await act(async () => {
      userEvent.type(searchInput, 'test{enter}');
    });

    return waitFor(() => {
      expect(screen.getByTestId('pagination')).toBeInTheDocument();
    });
  });

  it('should update the search query and display new results', async () => {
    render(<App />, { wrapper });

    const searchInput = screen.getByRole('textbox');
    await act(async () => {
      userEvent.type(searchInput, 'test{enter}');
    });

    await waitFor(() => {
      expect(screen.getByTestId('gif-grid')).toBeInTheDocument();
    });

    await act(async () => {
      userEvent.clear(searchInput);
      userEvent.type(searchInput, 'new-query{enter}');
    });

    return waitFor(() => {
      expect(screen.getByTestId('gif-grid')).toBeInTheDocument();
    });
  });

  it('should display "No results found" when the search input is empty or contains only whitespace', async () => {
    render(<App />, { wrapper });

    const searchInput = screen.getByRole('textbox');
    await act(async () => {
      userEvent.type(searchInput, '  {enter}');
    });

    return waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });

  it('should update the GifGrid component when clicking on a different page in the Pagination component', async () => {
    render(<App />, { wrapper });

    const searchInput = screen.getByRole('textbox');
    await act(async () => {
      userEvent.type(searchInput, 'test{enter}');
    });

    await waitFor(() => {
      expect(screen.getByTestId('gif-grid')).toBeInTheDocument();
    });

    const pageNumber = screen.getByText('2');
    fireEvent.click(pageNumber);

    return waitFor(() => {
      expect(screen.getByTestId('gif-grid')).toBeInTheDocument();
    });
  });

  it('should display "No results found" when the API returns an error or no results', async () => {
    render(<App />, { wrapper });

    const searchInput = screen.getByRole('textbox');
    await act(async () => {
      userEvent.type(searchInput, 'test{enter}');
    });

    return waitFor(() => {
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });
  });
});
