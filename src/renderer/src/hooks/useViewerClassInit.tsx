import { ViewerActions } from '@renderer/lib/file-system';
import { searchSelector } from '@renderer/lib/store';
import { useQuery } from '@tanstack/react-query';

type UseViewerClassInit = {
  viewerActions: ViewerActions | null | undefined;
  isLoading: boolean;
  error: Error | null;
};

interface UseViewerClassInitProps {
  viewerId: string | undefined;
  asyncFunctionKey: string;
}

export default function useViewerClassInit({ viewerId, asyncFunctionKey }: UseViewerClassInitProps): UseViewerClassInit {
  const { data, error, isLoading } = useQuery({ queryKey: [asyncFunctionKey], queryFn: initObj, retry: false });

  async function initObj(): Promise<ViewerActions> {
    const selectorType = 'viewers';

    if (viewerId === undefined) throw new Error('Invalid Viewer Id', { cause: 'sorterId' });
    const { selectorTitle, directoriesDestination } = searchSelector(selectorType, viewerId);
    const viewerActions = new ViewerActions(directoriesDestination, selectorTitle);
    await viewerActions.validateDestination();
    return viewerActions;
  }

  return { viewerActions: data, isLoading, error };
}
