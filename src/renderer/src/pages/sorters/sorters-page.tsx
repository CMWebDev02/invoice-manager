import { searchSelector } from '@renderer/lib/store';
import { useParams } from 'react-router';

export default function SortersPage(): React.JSX.Element {
  const { sorterId } = useParams();
  const selectorType = 'sorters';

  if (!sorterId) {
    return <h1>Error!</h1>;
  }

  const { selectorId, selectorTitle, directoriesDestination, invoicesDestination } = searchSelector(selectorType, sorterId);

  return (
    <>
      <h1>{directoriesDestination}</h1>
      <h1>{invoicesDestination}</h1>
    </>
  );
}
