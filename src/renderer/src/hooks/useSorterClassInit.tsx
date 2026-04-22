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

export default function useSorterClassInit({ sorterId, asyncFunctionKey }: UseSorterClassInitProps): UseSorterClassInit {
  const { data, error, isLoading } = useQuery({ queryKey: [asyncFunctionKey], queryFn: initObj, retry: false });

  async function initObj(): Promise<SorterActions> {
    const selectorType = 'sorters';

    if (sorterId === undefined) throw new Error('Invalid Sorter Id', { cause: 'sorterId' });
    const { selectorTitle, directoriesDestination, invoicesDestination } = searchSelector(selectorType, sorterId);
    if (invoicesDestination === undefined) throw new Error('Invalid Invoices Destination', { cause: 'invoicesDestination' });
    const sorterObj = new SorterActions(directoriesDestination, invoicesDestination, selectorTitle);
    await sorterObj.validateDirectories();
    return sorterObj;
  }

  return { sorterActions: data, isLoading, error };
}
