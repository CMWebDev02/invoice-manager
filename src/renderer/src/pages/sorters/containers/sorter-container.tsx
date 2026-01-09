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
  const [selectedDirectory, setSelectedDirectory] = useState<DirectoryExport | null>(null);
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

  function validateCurrentSelections(): void {
    try {
      if (selectedDirectory === null) throw new Error('No Directory Selected');

      if (selectedYear === '') throw new Error('No Year Selected');

      if (invoiceObj === null) throw new Error('Invalid Invoice');

      sortFile(selectedDirectory, selectedYear, invoiceObj);
    } catch (error) {
      console.error(error);
    }
  }

  function sortFile(dir: DirectoryExport, year: string, invoice: FileExport): void {
    console.log(dir, year, invoice);
  }

  return (
    <>
      <SortersNavBar sorterTitle={sorterTitle} triggerSorting={validateCurrentSelections} />
      <main className="h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-y-auto w-screen bg-background">
        <div className="w-full h-full flex flex-row p-2">
          <DirectoryNavigation directoriesArrays={directoriesArrays !== null ? directoriesArrays : []} selectedDirectory={selectedDirectory} updateSelectedDirectory={updateSelectedDirectory} updateCurrentYear={setSelectedYear} />

          {invoiceObj !== null && <FileDisplay invoiceFileData={invoiceObj.data} />}
        </div>
      </main>
    </>
  );
}
