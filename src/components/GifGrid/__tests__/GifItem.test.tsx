import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import React from 'react';

import { GifItem } from '../GifItem';

const renderGifItem = (
  props: Partial<React.ComponentProps<typeof GifItem>> = {}
) => {
  const defaultProps: React.ComponentProps<typeof GifItem> = {
    url: 'https://example.com/sample.gif',
    title: 'Sample Gif',
  };

  return render(<GifItem {...defaultProps} {...props} />);
};

describe('<GifItem />', () => {
  it('renders correctly with given props', () => {
    const { getByAltText } = renderGifItem({
      url: 'https://example.com/sample.gif',
      title: 'Sample Gif',
    });

    const imgElement = getByAltText('Sample Gif');
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'https://example.com/sample.gif');
  });

  it('alt attribute should match the title prop', () => {
    const { getByAltText } = renderGifItem({ title: 'Another Gif' });

    const imgElement = getByAltText('Another Gif');
    expect(imgElement).toBeInTheDocument();
  });

  it('src attribute should match the url prop', () => {
    const { getByAltText } = renderGifItem({
      url: 'https://example.com/another.gif',
    });

    const imgElement = getByAltText('Sample Gif');
    expect(imgElement).toHaveAttribute(
      'src',
      'https://example.com/another.gif'
    );
  });
});
