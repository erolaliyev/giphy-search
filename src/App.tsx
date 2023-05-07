import styled from '@emotion/styled';

import { GifGrid } from './components/GifGrid/GifGrid';
import { Pagination } from './components/Pagination/Pagination';
import { SearchInput } from './components/SearchInput/SearchInput';
import { useGifSearch } from './hooks/useGifSearch';
import { useQueryParams } from './hooks/useQueryParams';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const GIFS_PER_PAGE = 10;

const App = () => {
  const { searchParams } = useQueryParams();

  const query = searchParams.get('q') || '';
  const offset = parseInt(searchParams.get('offset') || '0', 10);
  const limit = parseInt(searchParams.get('limit') || '50', 10);

  const { gifs, loading } = useGifSearch(query, offset, limit);

  return (
    <Container>
      <SearchInput />
      {loading ? (
        <p>Loading...</p>
      ) : (
        query !== '' &&
        (gifs.length === 0 ? (
          <p>No results found</p>
        ) : (
          <>
            <GifGrid
              gifs={gifs}
              offset={offset}
              gifsPerPage={GIFS_PER_PAGE}
              data-testid='gif-grid'
            />
            <Pagination
              totalPages={Math.ceil(gifs.length / GIFS_PER_PAGE)}
              data-testid='pagination'
            />
          </>
        ))
      )}
    </Container>
  );
};

export default App;
