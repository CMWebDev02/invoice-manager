import SorterContainer from './containers/sorter-container';
import { useParams } from 'react-router';
import useSorterClassInit from '../../hooks/useSorterClassInit';
import ErrorPage from '@renderer/components/pages/error-page';

export default function SortersPage(): React.JSX.Element {
  const { sorterId } = useParams();
  const { sorterActions, isLoading, error } = useSorterClassInit({ sorterId, asyncFunctionKey: 'sorting-class' });

  if (error !== null) {
    return <ErrorPage error={error} />;
  }

  if (sorterActions === null || sorterActions === undefined) {
    return <ErrorPage error={new Error('Failed to Access Sorter!')} />;
  }

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      <SorterContainer sorterActions={sorterActions} />
    </>
  );
}
