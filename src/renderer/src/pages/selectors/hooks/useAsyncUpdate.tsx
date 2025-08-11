import { type Dirent } from 'fs';
import { useEffect, useState } from 'react';

type UseAsyncUpdate = {
  updateResults: unknown;
  isLoading: boolean;
  error: unknown;
};

// https://www.tutorialsteacher.com/typescript/typescript-generic-interface
// https://www.typescriptlang.org/docs/handbook/2/generics.html

type PotentialResultTypes = Dirent[];

type PotentialTriggerTypes = string;

interface UseAsyncUpdateProps {
  asyncFunction: (updateTrigger: PotentialTriggerTypes) => Promise<PotentialResultTypes>;
  updateTrigger: PotentialTriggerTypes;
}

export default function useAsyncUpdate({ asyncFunction, updateTrigger }: UseAsyncUpdateProps): UseAsyncUpdate {
  const [updateResults, setUpdateResults] = useState<PotentialResultTypes>();
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
