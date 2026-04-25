import { useParams } from 'react-router';
import ViewerContainer from './containers/viewer-container';
import useViewerClassInit from '@renderer/hooks/useViewerClassInit';
import LoadingPage from '../loading/loading-page';
import ErrorPage from '@renderer/components/pages/error-page';

export default function ViewersPage(): React.JSX.Element {
  const { viewerId } = useParams();
  // Creates a unique query key using the viewerId
  //! There is the possibility for the key to append undefined but if this occurs no page is returned anyway
  const { viewerActions, isLoading, error } = useViewerClassInit({ viewerId, asyncFunctionKey: `viewers-class-${viewerId}` });

  if (error !== null) {
    return <ErrorPage errors={[error]} />;
  }

  if (viewerActions === null || viewerActions === undefined) {
    return <ErrorPage errors={[new Error('Failed to Access Viewer!')]} />;
  }

  return (
    <>
      {isLoading && <LoadingPage />}
      <ViewerContainer viewerActions={viewerActions} />
    </>
  );
}
