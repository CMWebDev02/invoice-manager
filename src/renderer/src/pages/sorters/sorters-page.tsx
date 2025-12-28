import { useParams } from 'react-router';

interface SortersPageProps {}

export default function SortersPage(): React.JSX.Element {
  const { sorterId } = useParams();

  return <h1>{sorterId}</h1>;
}
