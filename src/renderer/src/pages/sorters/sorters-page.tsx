import { searchSelector } from '@renderer/lib/store';
import { useParams } from 'react-router';

interface SortersPageProps {}

export default function SortersPage(): React.JSX.Element {
  const { sorterId } = useParams();
  const selectorType = "sorters"

  const selectorInfo = searchSelector(selectorType, sorterId);

  return <h1>{sorterId}</h1>;
}
