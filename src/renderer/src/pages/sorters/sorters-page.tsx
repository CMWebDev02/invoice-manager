import SorterContainer from './containers/sorter-container';
import { useParams } from 'react-router';
import UseSorterClassInit from './hooks/useSorterClassInit';

export default function SortersPage(): React.JSX.Element {
  const { sorterId } = useParams();
  const { sorterActions, isLoading, error } = UseSorterClassInit({ sorterId, asyncFunctionKey: 'sorting-class' });

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {sorterActions === null || sorterActions === undefined ? <h1>Error: {error?.message}</h1> : <SorterContainer sorterActions={sorterActions} />}
    </>
  );
}
