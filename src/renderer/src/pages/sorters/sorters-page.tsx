import { useParams } from 'react-router';

interface SortersPageProps {}

export default function SortersPage(): React.JSX.Element {
  const { sortersId } = useParams();

  return <h1>{sortersId}</h1>;
}
