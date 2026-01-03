import SortersNavBar from '../components/sorters-navbar';
import DirectoryNavigation from './directory-navigation';
import FileDisplay from './file-display';
import { getCurrentInvoice, getLetterFolderDirectories } from '@renderer/lib/utils';
import useFetchData from '../hooks/useFetchData';
import { Dirent } from 'fs';

interface SortersContainerProps {
  sorterTitle: string;
  directoriesDestination: string;
  invoicesDestination: string;
}

export default function SorterContainer({ sorterTitle, directoriesDestination, invoicesDestination }: SortersContainerProps): React.JSX.Element {
  const { fetchData: directoriesArrays, error: hasDirectoriesErrored, isLoading: areDirectoriesLoading, triggerRefetching: refetchDirectories } = useFetchData<string, Dirent[][]>({ asyncFunction: getLetterFolderDirectories, asyncFunctionProp: directoriesDestination });
  const { fetchData: currentInvoice, error: hasInvoiceErrored, isLoading: isInvoiceLoading, triggerRefetching: refetchInvoice } = useFetchData<string, string>({ asyncFunction: getCurrentInvoice, asyncFunctionProp: invoicesDestination });

  if (areDirectoriesLoading || isInvoiceLoading) {
    return <h1>Loading...</h1>;
  }

  if (hasDirectoriesErrored || hasInvoiceErrored) {
    return <h1>Error Has Occurred</h1>;
  }

  return (
    <>
      <SortersNavBar sorterTitle={sorterTitle} />
      <main className="h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-y-auto w-screen bg-background">
        <div className="w-full h-full flex flex-row p-2">
          <DirectoryNavigation />

          <FileDisplay currentInvoice={currentInvoice !== null ? currentInvoice : ''} />
        </div>
      </main>
    </>
  );
}
