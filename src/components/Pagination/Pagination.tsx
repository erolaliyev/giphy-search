import React from 'react';
import styled from '@emotion/styled';

import { useQueryParams } from '../../hooks/useQueryParams';

interface PaginationProps {
  totalPages: number;
  'data-testid'?: string;
}

const PaginationContainer = styled.div`
  button {
    cursor: pointer;
  }
`;

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  'data-testid': dataTestId,
}) => {
  const { searchParams, setQueryParam } = useQueryParams();
  const currentPage = parseInt(searchParams.get('offset') || '0', 10);

  const handlePageChange = (newPage: number) => {
    setQueryParam('offset', newPage);
  };

  return (
    <PaginationContainer data-testid={dataTestId}>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index)}
          disabled={index === currentPage}
        >
          {index + 1}
        </button>
      ))}
    </PaginationContainer>
  );
};
