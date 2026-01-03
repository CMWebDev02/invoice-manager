import { useEffect, useState } from 'react';
import SortersNavBar from '../components/sorters-navbar';
import DirectoryNavigation from './directory-navigation';
import FileDisplay from './file-display';
import { getCurrentInvoice, getLetterFolderDirectories } from '@renderer/lib/utils';
import type { Dirent } from 'fs';

interface SortersContainerProps {
  sorterTitle: string;
  directoriesDestination: string;
  invoicesDestination: string;
}

export default function SorterContainer({ sorterTitle, directoriesDestination, invoicesDestination }: SortersContainerProps): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasErrored, setHasErrored] = useState<boolean>(false);
  const [directoriesArrays, setDirectoriesArrays] = useState<Dirent<string>[][]>([]);
  const [currentInvoice, setCurrentInvoice] = useState<string>('');

  useEffect(() => {
    try {
      async function validateSorter(): Promise<void> {
        // Add an error check for the returned content
        const invoice = await getCurrentInvoice(invoicesDestination);
        setCurrentInvoice(invoice);

        const directoriesContents = await getLetterFolderDirectories(directoriesDestination);
        setDirectoriesArrays(directoriesContents);
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

          <FileDisplay currentInvoice={currentInvoice} />
        </div>
      </main>
    </>
  );
}
