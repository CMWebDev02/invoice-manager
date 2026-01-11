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
  const [error, setError] = useState<string>('');
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
      // Credit: https://engineering.udacity.com/handling-errors-like-a-pro-in-typescript-d7a314ad4991
      // Described the way to access errors when they are known instances of error objects and how to handle unknown errors
      if (error instanceof Error) {
        setError(`${error.name}: ${error.message}`);
      } else {
        setError(`Unknown Error has occurred!`);
      }
      console.error(error);
      setFetchData(null);
    } finally {
      setIsLoading(false);
      setIsRefetching(false);
    }
  }, [asyncFunction, asyncFunctionProp, isRefetching]);

  return { fetchData, isLoading, error, triggerRefetching };
}
