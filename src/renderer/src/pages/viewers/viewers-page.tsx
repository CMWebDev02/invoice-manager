import { useParams } from 'react-router';
import ViewerContainer from './containers/viewer-container';
import useViewerClassInit from '@renderer/hooks/useViewerClassInit';

export default function SortersPage(): React.JSX.Element {
  const { sorterId } = useParams();
  const { viewerActions, isLoading, error } = useViewerClassInit({ sorterId, asyncFunctionKey: 'sorting-class' });

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {viewerActions === null || viewerActions === undefined ? <h1>Error: {error?.message}</h1> : <ViewerContainer viewerActions={viewerActions} />}
    </>
  );
}
