import { useParams } from 'react-router';
import ViewerContainer from './containers/viewer-container';
import useViewerClassInit from '@renderer/hooks/useViewerClassInit';
import LoadingPage from '../loading/loading-page';
import ErrorPage from '@renderer/components/pages/error-page';

export default function ViewersPage(): React.JSX.Element {
  const { viewerId } = useParams();
  const { viewerActions, isLoading, error } = useViewerClassInit({ viewerId, asyncFunctionKey: 'sorting-class' });

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
