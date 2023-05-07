import { render } from '@testing-library/react';

import { GifGrid } from '../GifGrid';
import { GifItem } from '../GifItem';

jest.mock('../GifItem', () => {
  return {
    GifItem: jest.fn((props) => (
      <div
        data-testid='gif-item'
        data-key={props.key}
        data-url={props.url}
        data-title={props.title}
      />
    )),
  };
});

const sampleGifs = [
  {
    id: '1',
    images: {
      fixed_height: {
        url: 'https://example.com/1.gif',
      },
    },
    title: 'Sample Gif 1',
  },
  {
    id: '2',
    images: {
      fixed_height: {
        url: 'https://example.com/2.gif',
      },
    },
    title: 'Sample Gif 2',
  },
  {
    id: '3',
    images: {
      fixed_height: {
        url: 'https://example.com/3.gif',
      },
    },
    title: 'Sample Gif 3',
  },
];

describe('<GifGrid />', () => {
  it('renders correctly with given props', () => {
    const { container } = render(
      <GifGrid gifs={sampleGifs} offset={0} gifsPerPage={2} />
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders correct number of GifItem components based on gifsPerPage', () => {
    render(<GifGrid gifs={sampleGifs} offset={0} gifsPerPage={2} />);

    expect(GifItem).toHaveBeenCalledTimes(2);
  });

  it('renders correctly with an empty list of gifs', () => {
    const { container } = render(
      <GifGrid gifs={[]} offset={0} gifsPerPage={2} />
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders correct number of GifItem components when total gifs is less than gifsPerPage', () => {
    render(
      <GifGrid gifs={sampleGifs.slice(0, 1)} offset={0} gifsPerPage={2} />
    );

    expect(GifItem).toHaveBeenCalledTimes(1);
  });
});
