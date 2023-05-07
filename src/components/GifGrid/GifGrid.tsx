import React from 'react';
import styled from '@emotion/styled';

import { GifItem } from './GifItem';

interface GifGridProps {
  gifs: Array<{
    id: string;
    images: {
      fixed_height: {
        url: string;
      };
    };
    title: string;
  }>;
  offset: number;
  gifsPerPage: number;
  'data-testid'?: string;
}

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border: 1px solid red;
  margin: 20px 10px;
`;

export const GifGrid: React.FC<GifGridProps> = ({
  gifs,
  offset,
  gifsPerPage,
  'data-testid': dataTestId,
}) => {
  const displayedGifs = gifs.slice(
    offset * gifsPerPage,
    (offset + 1) * gifsPerPage
  );
  return (
    <GridContainer data-testid={dataTestId}>
      {displayedGifs.map((gif) => (
        <GifItem
          key={gif.id}
          url={gif.images.fixed_height.url}
          title={gif.title}
        />
      ))}
    </GridContainer>
  );
};
