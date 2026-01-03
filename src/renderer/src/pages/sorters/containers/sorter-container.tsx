import { useEffect, useState } from 'react';
import SortersNavBar from '../components/sorters-navbar';
import DirectoryNavigation from './directory-navigation';
import FileDisplay from './file-display';
import { initializeSorter } from '@renderer/lib/utils';

interface SortersContainerProps {
  sorterTitle: string;
  directoriesDestination: string;
  invoicesDestination: string;
}

export default function SorterContainer({ sorterTitle, directoriesDestination, invoicesDestination }: SortersContainerProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasErrored, setHasErrored] = useState<boolean>(false);

  useEffect(() => {
    try {
      async function validateSorter(): Promise<void> {
        const isValid = await initializeSorter(directoriesDestination, invoicesDestination);
        if (!isValid) throw new Error('Sorter setting invalid!');
      }

      validateSorter();
    } catch (error) {
      console.error(error);
      setHasErrored(true);
    } finally {
      setIsLoading(false);
    }
  }, [directoriesDestination, invoicesDestination]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (hasErrored) {
    return <h1>Error Has Occurred</h1>;
  }

  return (
    <>
      <SortersNavBar sorterTitle={sorterTitle} />
      <main className="h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-y-auto w-screen bg-background">
        <div className="w-full h-full flex flex-row p-2">
          <DirectoryNavigation />

          <FileDisplay />
        </div>
      </main>
    </>
  );
}
