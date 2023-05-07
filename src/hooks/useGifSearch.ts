import { useState, useEffect } from 'react';
import axios from 'axios';

if (!process.env.REACT_APP_API_KEY || !process.env.REACT_APP_API_URL) {
  throw new Error(
    'API_KEY or API_URL is not defined in the environment variables'
  );
}

const API_KEY = process.env.REACT_APP_API_KEY;
const API_URL = process.env.REACT_APP_API_URL;

export function useGifSearch(query: string, offset: number, limit: number) {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: {
          api_key: API_KEY,
          q: query,
          offset,
          limit,
        },
      });
      setGifs(response.data.data);
      setLoading(false);
    };
    if (query !== '') {
      fetchData();
    } else {
      setGifs([]);
    }
  }, [query, offset, limit]);

  return { gifs, loading };
}
