import { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { useDebounce } from '../../hooks/useDebounce';
import { useQueryParams } from '../../hooks/useQueryParams';

const SearchInputContainer = styled.div`
  display: flex;
  // border: 1px solid green;
  flex-flow: column nowrap;
  align-items: center;
  input {
    // border: 1px solid red;
    width: 80%;
  }
`;

export const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { setQueryParam } = useQueryParams();

  useEffect(() => {
    setQueryParam('q', debouncedSearchTerm);
    setQueryParam('limit', '50');
    setQueryParam('offset', '0');
  }, [debouncedSearchTerm]);

  return (
    <SearchInputContainer>
      <h1>Search for GIFs</h1>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Enter search term...'
      />
    </SearchInputContainer>
  );
};
