import { searchSelector } from '@renderer/lib/store';
import SorterContainer from './containers/sorter-container';
import { useParams } from 'react-router';

// TODO Add the error popups
// TODO Add the new directory modal and logic
// TODO Review all functions and revalidate their error checking and return values

export default function SortersPage(): React.JSX.Element {
  const { sorterId } = useParams();
  const selectorType = 'sorters';

  if (sorterId) {
    const { selectorTitle, directoriesDestination, invoicesDestination } = searchSelector(selectorType, sorterId);

    // Have this check that a valid directory was pulled after searching
    if (selectorTitle !== '' && directoriesDestination !== '' && invoicesDestination !== undefined) {
      return <SorterContainer sorterTitle={selectorTitle} directoriesDestination={directoriesDestination} invoicesDestination={invoicesDestination} />;
    }
  }

  return <h1>Error</h1>;
}
