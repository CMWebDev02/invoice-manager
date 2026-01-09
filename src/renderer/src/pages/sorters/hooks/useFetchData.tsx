import { useEffect, useState } from 'react';

type UseFetchData<UpdateType> = {
  fetchData: UpdateType;
  isLoading: boolean;
  error: unknown;
  triggerRefetching: () => void;
};

interface UseFetchDataProps<PropType, ReturnType> {
  asyncFunction: (asyncFunctionProp: PropType) => Promise<ReturnType | null>;
  asyncFunctionProp: PropType;
}

export default function useFetchData<PropType, ReturnType>({ asyncFunction, asyncFunctionProp }: UseFetchDataProps<PropType, ReturnType>): UseFetchData<ReturnType | null> {
  const [fetchData, setFetchData] = useState<ReturnType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();
  const [isRefetching, setIsRefetching] = useState<boolean>(false);

  const triggerRefetching = (): void => setIsRefetching(true);

  useEffect(() => {
    try {
      async function getData(): Promise<void> {
        const result = await asyncFunction(asyncFunctionProp);
        if (result === null) throw new Error('Failed to collect data!');
        setFetchData(result);
      }

      setIsLoading(true);
      getData();
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  }, [asyncFunction, asyncFunctionProp, isRefetching]);

  return { fetchData, isLoading, error, triggerRefetching };
}
