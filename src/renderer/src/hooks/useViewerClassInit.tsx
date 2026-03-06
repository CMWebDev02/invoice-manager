import { ViewerActions } from '@renderer/lib/file-system';
import { searchSelector } from '@renderer/lib/store';
import { useQuery } from '@tanstack/react-query';

type UseViewerClassInit = {
  viewerActions: ViewerActions | null | undefined;
  isLoading: boolean;
  error: Error | null;
};

interface UseViewerClassInitProps {
  sorterId: string | undefined;
  asyncFunctionKey: string;
}

export default function useViewerClassInit({ sorterId, asyncFunctionKey }: UseViewerClassInitProps): UseViewerClassInit {
  const { data, error, isLoading } = useQuery({ queryKey: [asyncFunctionKey], queryFn: initObj, retry: false });

  async function initObj(): Promise<ViewerActions> {
    const selectorType = 'viewers';

    if (sorterId === undefined) throw new Error('Invalid Sorter Id', { cause: 'sorterId' });
    const { selectorTitle, directoriesDestination } = searchSelector(selectorType, sorterId);
    const viewerActions = new ViewerActions(directoriesDestination, selectorTitle);
    await viewerActions.validateDestination();
    return viewerActions;
  }

  return { viewerActions: data, isLoading, error };
}
