import { useEffect, useState } from 'react';

type UseAsyncUpdate = {
  updateResults: unknown;
  isLoading: boolean;
  error: unknown;
};

interface UseAsyncUpdateProps {
  asyncFunction: (updateTrigger: unknown) => Promise<unknown>;
  updateTrigger: string | number;
}

export default function useAsyncUpdate({ asyncFunction, updateTrigger }: UseAsyncUpdateProps): UseAsyncUpdate {
  const [updateResults, setUpdateResults] = useState<unknown>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    try {
      async function getUpdatedResults(): Promise<void> {
        const results = await asyncFunction(updateTrigger);
        console.log(results);
        setUpdateResults(results);
      }
      setIsLoading(true);
      getUpdatedResults();
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [asyncFunction, updateTrigger]);

  return { updateResults, isLoading, error };
}
