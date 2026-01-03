import { useEffect, useState } from 'react';

type UseAsyncUpdate<UpdateType> = {
  updateResults: UpdateType;
  isLoading: boolean;
  error: unknown;
};

// https://www.tutorialsteacher.com/typescript/typescript-generic-interface
// https://www.typescriptlang.org/docs/handbook/2/generics.html

// PropType defines the typing for the updateTrigger and what is passed into the asyncFunction props
// ReturnType defines the type returned by the asyncFunction
interface UseAsyncUpdateProps<PropType, ReturnType> {
  asyncFunction: (updateTrigger: PropType) => Promise<ReturnType>;
  updateTrigger: PropType;
}

export default function useAsyncUpdate<PropType, ReturnType>({ asyncFunction, updateTrigger }: UseAsyncUpdateProps<PropType, ReturnType>): UseAsyncUpdate<ReturnType | null> {
  const [updateResults, setUpdateResults] = useState<ReturnType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    try {
      async function getUpdatedResults(): Promise<void> {
        const results = await asyncFunction(updateTrigger);
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
