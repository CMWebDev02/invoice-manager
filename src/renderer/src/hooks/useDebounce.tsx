import { useEffect, useState } from 'react';

interface UseDebounceProps {
  updateVar: string;
}

export default function useDebounce({ updateVar }: UseDebounceProps): string {
  const [debouncedVar, setDebouncedVar] = useState<string>('');

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedVar(updateVar);
    }, 250);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [updateVar]);

  return debouncedVar;
}
