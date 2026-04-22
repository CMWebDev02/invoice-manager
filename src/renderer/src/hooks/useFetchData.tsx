import { useQuery } from '@tanstack/react-query';

type UseFetchData<UpdateType> = {
  fetchData: UpdateType | undefined;
  isLoading: boolean;
  error: Error | null;
  triggerRefetching: () => void;
};

interface UseFetchDataProps<ReturnType> {
  asyncFunction: () => Promise<ReturnType>;
  asyncFunctionKey: string;
}

export default function useFetchData<ReturnType>({ asyncFunction, asyncFunctionKey }: UseFetchDataProps<ReturnType>): UseFetchData<ReturnType> {
  const { data, error, isLoading, refetch } = useQuery({ queryKey: [asyncFunctionKey], queryFn: getData, retry: false });

  async function getData(): Promise<Awaited<ReturnType>> {
    const result = await asyncFunction();

    return result;
  }

  return { fetchData: data, isLoading, error, triggerRefetching: refetch };
}
