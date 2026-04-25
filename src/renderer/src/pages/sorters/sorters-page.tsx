import SorterContainer from './containers/sorter-container';
import { useParams } from 'react-router';
import useSorterClassInit from '../../hooks/useSorterClassInit';
import ErrorPage from '@renderer/components/pages/error-page';

export default function SortersPage(): React.JSX.Element {
  const { sorterId } = useParams();
  // Creates a unique query key using the sorterId
  //! There is the possibility for the key to append undefined but if this occurs no page is returned anyway
  const { sorterActions, isLoading, error } = useSorterClassInit({ sorterId, asyncFunctionKey: `sorting-class-${sorterId}` });

  if (error !== null) {
    return <ErrorPage errors={[error]} />;
  }

  if (sorterActions === null || sorterActions === undefined) {
    return <ErrorPage errors={[new Error('Failed to Access Sorter!')]} />;
  }

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      <SorterContainer sorterActions={sorterActions} />
    </>
  );
}
