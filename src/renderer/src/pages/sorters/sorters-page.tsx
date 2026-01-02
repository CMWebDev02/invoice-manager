import { searchSelector } from '@renderer/lib/store';
import { useParams } from 'react-router';
import SortersNavBar from './components/sorters-navbar';
import { Input } from '@renderer/components/ui/input';
import { Button } from '@renderer/components/ui/button';

export default function SortersPage(): React.JSX.Element {
  const { sorterId } = useParams();
  const selectorType = 'sorters';

  if (!sorterId) {
    return <h1>Error!</h1>;
  }

  const { selectorId, selectorTitle, directoriesDestination, invoicesDestination } = searchSelector(selectorType, sorterId);

  return (
    <>
      <SortersNavBar sorterTitle={selectorTitle} />
      <main className="h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-y-auto w-screen bg-background">
        <div className="w-full h-full flex flex-row p-2">
          <div className="w-1/3">
            <div className="flex flex-row p-1 justify-around items-center w-full h-12">
              <h2 className="w-1/3">Search:</h2>
              <Input placeholder="Search..." />
            </div>
            <div className="flex flex-col w-full h-[calc(100%-3rem)] overflow-y-scroll bg-secondary">
              <div className="w-full">
                <Button className="w-5/6">Directory</Button>
                <Button className="w-1/6">-{'>'}</Button>
              </div>
            </div>
          </div>

          <div className="w-2/3 h-full p-2">
            <div className="bg-secondary w-full h-full" />
          </div>
        </div>
      </main>
    </>
  );
}
