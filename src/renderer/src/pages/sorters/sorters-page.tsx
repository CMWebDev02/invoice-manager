import { searchSelector } from '@renderer/lib/store';
import SorterContainer from './containers/sorter-container';
import { useParams } from 'react-router';

//// Get the sorterId upon loading the page,
//// validate the id,
//// if not valid return an error
//// else search for the selector and get its associated information
//// validate the invoices destination and the directories destination,
//// validate the letter folders within the directories destination
//// gather the file names within each letter folder
//// gather the current invoice within the invoice destination, each time a transfer occurs reacquire the current file value
//// filter the current directories available to the user based on their search, match from start only
// highlight and store the current directory the user selects
// transfer the current invoice to the currently selected directory

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
