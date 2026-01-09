import SortersNavBar from '../components/sorters-navbar';
import DirectoryNavigation from './directory-navigation';
import FileDisplay from './file-display';
import { getCurrentInvoice, getLetterFolderDirectories } from '@renderer/lib/utils';
import useFetchData from '../hooks/useFetchData';
import type { DirectoryExport, FileExport } from '@renderer/lib/types';
import { useEffect, useState } from 'react';

interface SortersContainerProps {
  sorterTitle: string;
  directoriesDestination: string;
  invoicesDestination: string;
}

export default function SorterContainer({ sorterTitle, directoriesDestination, invoicesDestination }: SortersContainerProps): React.JSX.Element {
  const [selectedDirectory, setSelectedDirectory] = useState<DirectoryExport>({ dirPath: '', name: '' });
  const [selectedYear, setSelectedYear] = useState<string>('');

  // TODO: Updates the directories to return a custom object containing the directory name and its path, use join to acquire it.
  const { fetchData: directoriesArrays, error: hasDirectoriesErrored, isLoading: areDirectoriesLoading, triggerRefetching: refetchDirectories } = useFetchData<string, DirectoryExport[][]>({ asyncFunction: getLetterFolderDirectories, asyncFunctionProp: directoriesDestination });
  const { fetchData: invoiceObj, error: hasInvoiceErrored, isLoading: isInvoiceLoading, triggerRefetching: refetchInvoice } = useFetchData<string, FileExport>({ asyncFunction: getCurrentInvoice, asyncFunctionProp: invoicesDestination });

  if (areDirectoriesLoading || isInvoiceLoading) {
    return <h1>Loading...</h1>;
  }

  if (hasDirectoriesErrored || hasInvoiceErrored) {
    return <h1>Error Has Occurred</h1>;
  }

  function updateSelectedDirectory(dirObj: DirectoryExport): void {
    setSelectedDirectory(dirObj);
  }

  return (
    <>
      <SortersNavBar sorterTitle={sorterTitle} />
      <main className="h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-y-auto w-screen bg-background">
        <div className="w-full h-full flex flex-row p-2">
          <DirectoryNavigation directoriesArrays={directoriesArrays !== null ? directoriesArrays : []} selectedDirectory={selectedDirectory} updateSelectedDirectory={updateSelectedDirectory} updateCurrentYear={setSelectedYear} />

          {invoiceObj !== null && <FileDisplay invoiceFileData={invoiceObj.data} />}
        </div>
      </main>
    </>
  );
}
