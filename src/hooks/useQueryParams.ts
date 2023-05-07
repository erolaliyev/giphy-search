import { useSearchParams } from 'react-router-dom';

export function useQueryParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const setQueryParam = (key: string, value: string | number) => {
    searchParams.set(key, value.toString());
    setSearchParams(searchParams);
  };

  return { searchParams, setQueryParam };
}
