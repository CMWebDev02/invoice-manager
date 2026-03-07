import { useParams } from 'react-router';
import ViewerContainer from './containers/viewer-container';
import useViewerClassInit from '@renderer/hooks/useViewerClassInit';

export default function ViewersPage(): React.JSX.Element {
  const { viewerId } = useParams();
  const { viewerActions, isLoading, error } = useViewerClassInit({ viewerId, asyncFunctionKey: 'sorting-class' });

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {viewerActions === null || viewerActions === undefined ? <h1>Error: {error?.message}</h1> : <ViewerContainer viewerActions={viewerActions} />}
    </>
  );
}
