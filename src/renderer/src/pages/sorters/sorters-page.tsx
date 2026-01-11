import { searchSelector } from '@renderer/lib/store';
import SorterContainer from './containers/sorter-container';
import { useParams } from 'react-router';

// TODO Switch to TanStack Query to handle api calls
// TODO Trigger a refresh of the current invoice upon successful file transfer
// TODO Rename any invoice vars to file
// TODO Add the new directory modal and logic
// TODO Add the error popups
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
