import React from 'react';
import styled from '@emotion/styled';

interface GifItemProps {
  url: string;
  title: string;
}

const GifItemContainer = styled.div`
  padding: 0 3px;
`;

export const GifItem: React.FC<GifItemProps> = ({ url, title }) => {
  return (
    <GifItemContainer>
      <img src={url} alt={title} />
    </GifItemContainer>
  );
};
