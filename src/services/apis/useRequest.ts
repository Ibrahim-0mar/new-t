import useSWR from 'swr';
import api from './api';

async function fetcher(url: string) {
  const response = await api.get(url);
  return response.data;
}

export function useRequest(path: string) {
  const { data, error } = useSWR(path, fetcher);

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
}
