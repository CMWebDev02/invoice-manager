import SortersNavBar from '../components/sorters-navbar';
import DirectoryNavigation from './directory-navigation';
import FileDisplay from './file-display';
import { getCurrentInvoice, getLetterFolderDirectories, transferFile } from '@renderer/lib/utils';
import useFetchData from '../hooks/useFetchData';
import type { DirectoryExport, FileExport } from '@renderer/lib/types';
import { useEffect, useState } from 'react';

interface SortersContainerProps {
  sorterTitle: string;
  directoriesDestination: string;
  invoicesDestination: string;
}

export default function SorterContainer({ sorterTitle, directoriesDestination, invoicesDestination }: SortersContainerProps): React.JSX.Element {
  const [isInteractionDisabled, setIsInteractionDisabled] = useState<boolean>(true);
  const [selectedDirectory, setSelectedDirectory] = useState<DirectoryExport | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('');

  // TODO: Updates the directories to return a custom object containing the directory name and its path, use join to acquire it.
  const { fetchData: directoriesArrays, error: directoryError, isLoading: areDirectoriesLoading, triggerRefetching: refetchDirectories } = useFetchData<string, DirectoryExport[][]>({ asyncFunction: getLetterFolderDirectories, asyncFunctionProp: directoriesDestination, asyncFunctionKey: 'directories' });
  const { fetchData: invoiceObj, error: invoiceError, isLoading: isInvoiceLoading, triggerRefetching: refetchInvoice } = useFetchData<string, FileExport>({ asyncFunction: getCurrentInvoice, asyncFunctionProp: invoicesDestination, asyncFunctionKey: 'invoices' });

  useEffect(() => {
    console.log(invoiceObj);
    if (invoiceObj !== null && directoriesArrays !== null) {
      setIsInteractionDisabled(false);
    }
  }, [invoiceObj, directoriesArrays]);

  if (areDirectoriesLoading || isInvoiceLoading) {
    return <h1>Loading...</h1>;
  }

  if (directoryError || invoiceError) {
    return (
      <h1>
        <h2>Error Occurred: </h2>
        <h2>{invoiceError?.message}</h2>
        <h2>{directoryError?.message}</h2>
      </h1>
    );
  }

  function updateSelectedDirectory(dirObj: DirectoryExport): void {
    setSelectedDirectory(dirObj);
  }

  function validateCurrentSelections(): void {
    try {
      if (selectedDirectory === null) throw new Error('No Directory Selected');

      if (selectedYear === '') throw new Error('No Year Selected');

      if (invoiceObj === undefined) throw new Error('Invalid Invoice');

      setIsInteractionDisabled(true);
      sortFile(selectedDirectory, selectedYear, invoiceObj);
    } catch (error) {
      // TODO: Have this generate a pop up to indicate the error.
      console.error(error);
    }
  }

  async function sortFile(dir: DirectoryExport, year: string, invoice: FileExport): Promise<void> {
    try {
      const isTransferSuccessful = await transferFile(invoice, dir, year);
      if (!isTransferSuccessful) throw new Error('File Failed to Transfer');
      refetchInvoice();
    } catch (error) {
      // TODO: Have this generate a pop up to indicate the error.
      console.error(error);
    }
  }

  return (
    <>
      <SortersNavBar sorterTitle={sorterTitle} triggerSorting={validateCurrentSelections} />
      <main className="h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-y-auto w-screen bg-background">
        <div className="w-full h-full flex flex-row p-2">
          {directoriesArrays !== undefined && <DirectoryNavigation disabled={isInteractionDisabled} directoriesArrays={directoriesArrays} selectedDirectory={selectedDirectory} updateSelectedDirectory={updateSelectedDirectory} updateCurrentYear={setSelectedYear} />}

          {invoiceObj !== undefined && invoiceObj !== null && <FileDisplay disabled={isInteractionDisabled} invoiceFileData={invoiceObj.data} />}
        </div>
      </main>
    </>
  );
}
