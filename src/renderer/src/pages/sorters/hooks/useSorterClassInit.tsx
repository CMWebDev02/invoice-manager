import { SorterActions } from '@renderer/lib/file-system';
import { searchSelector } from '@renderer/lib/store';
import { useQuery } from '@tanstack/react-query';

type UseSorterClassInit = {
  sorterActions: SorterActions | null | undefined;
  isLoading: boolean;
  error: Error | null;
};

interface UseSorterClassInitProps {
  sorterId: string | undefined;
  asyncFunctionKey: string;
}

export default function UseSorterClassInit({ sorterId, asyncFunctionKey }: UseSorterClassInitProps): UseSorterClassInit {
  const { data, error, isLoading, refetch } = useQuery({ queryKey: [asyncFunctionKey], queryFn: getData, retry: false });

  async function getData(): Promise<SorterActions | null> {
    const selectorType = 'sorters';

    if (sorterId === undefined) return null;
    const { selectorTitle, directoriesDestination, invoicesDestination } = searchSelector(selectorType, sorterId);
    if (invoicesDestination === undefined) return null;
    const sorterObj = new SorterActions(directoriesDestination, invoicesDestination, selectorTitle);
    await sorterObj.validateDirectories();
    return sorterObj;
  }

  return { sorterActions: data, isLoading, error };
}
