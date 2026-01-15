import SortersNavBar from '../components/sorters-navbar';
import DirectoryNavigation from './directory-navigation';
import InvoiceDisplay from './invoice-display';
import { getCurrentInvoice, getLetterFolderDirectories, getUniqueID, initializeNewDir, joinPaths, lettersArray, transferFile } from '@renderer/lib/utils';
import useFetchData from '../hooks/useFetchData';
import type { ChangeLogEntry, DirectoryExport, FileExport } from '@renderer/lib/types';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import NewDirectoryModal from '../components/new-directory-modal';
import ChangeLog from './changelog';
import ChangeLogDrawer from '../components/changelog-drawer';

interface SortersContainerProps {
  sorterTitle: string;
  directoriesDestination: string;
  invoicesDestination: string;
}

export default function SorterContainer({ sorterTitle, directoriesDestination, invoicesDestination }: SortersContainerProps): React.JSX.Element {
  const [isInteractionDisabled, setIsInteractionDisabled] = useState<boolean>(true);
  const [selectedDirectory, setSelectedDirectory] = useState<DirectoryExport | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [newDirectoryName, setNewDirectoryName] = useState<string>('');
  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const toggleModal = (): void => {
    if (isModalOpen) {
      setNewDirectoryName('');
    }

    setIsModalOpen(!isModalOpen);
  };
  const toggleDrawer = (): void => setIsDrawerOpen(!isDrawerOpen);

  const { fetchData: directoriesArrays, error: directoryError, isLoading: areDirectoriesLoading, triggerRefetching: refetchDirectories } = useFetchData<string, DirectoryExport[][]>({ asyncFunction: getLetterFolderDirectories, asyncFunctionProp: directoriesDestination, asyncFunctionKey: 'directories' });
  const { fetchData: invoiceObj, error: invoiceError, isLoading: isInvoiceLoading, triggerRefetching: refetchInvoice } = useFetchData<string, FileExport>({ asyncFunction: getCurrentInvoice, asyncFunctionProp: invoicesDestination, asyncFunctionKey: 'invoices' });

  useEffect(() => {
    if (invoiceObj !== null && directoriesArrays !== null && invoiceObj !== undefined && directoriesArrays !== undefined) {
      setIsInteractionDisabled(false);
    }
  }, [invoiceObj, directoriesArrays]);

  function updateSelectedDirectory(dirObj: DirectoryExport): void {
    setSelectedDirectory(dirObj);
  }

  function validateCurrentSelections(): void {
    try {
      if (selectedDirectory === null) throw new Error('No Directory Selected');

      if (selectedYear === '') throw new Error('No Year Selected');

      if (invoiceObj === undefined) throw new Error('Invalid Invoice');

      setIsInteractionDisabled(true);
      sortInvoice(selectedDirectory, selectedYear, invoiceObj);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An Unknown Error has Occurred';
      toast.error('Validation Error!', {
        description: errorMessage
      });
    }
  }

  async function sortInvoice(dir: DirectoryExport, year: string, invoice: FileExport): Promise<void> {
    try {
      const newFolderLocation = await transferFile(invoice, dir, year);
      if (newFolderLocation === '') throw new Error('Invoice Failed to Transfer');
      refetchInvoice();
      setChangeLog((changeArray) => {
        const changeId = getUniqueID();

        const newChange: ChangeLogEntry = {
          id: changeId,
          actionType: 'sorting',
          actionDetails: {
            itemName: invoice.name,
            itemPath: newFolderLocation
          }
        };
        return [newChange, ...changeArray];
      });
    } catch (error) {
      refetchInvoice();
      const errorMessage = error instanceof Error ? error.message : 'An Unknown Error has Occurred';
      toast.error('File Transfer Error!', {
        description: errorMessage
      });
    }
  }

  async function createNewDirectory(): Promise<void> {
    if (newDirectoryName === '') {
      toast.error('New Directory Name Is Invalid!');
      return;
    }

    const newDirectoryLetterFolder = newDirectoryName[0];

    if (lettersArray.includes(newDirectoryLetterFolder?.toUpperCase())) {
      const directoryLetterFolderPath = joinPaths(directoriesDestination, newDirectoryLetterFolder);
      const newDirectoryPath = joinPaths(directoryLetterFolderPath, newDirectoryName);
      const isCreationSuccessful = await initializeNewDir(newDirectoryPath);
      if (isCreationSuccessful) {
        setIsInteractionDisabled(true);
        refetchDirectories();
        toggleModal();
        setChangeLog((changeArray) => {
          const changeId = getUniqueID();

          const newChange: ChangeLogEntry = {
            id: changeId,
            actionType: 'creating',
            actionDetails: {
              itemName: newDirectoryName,
              itemPath: newDirectoryPath
            }
          };
          return [newChange, ...changeArray];
        });
      } else {
        toast.error('New Directory Name Failed to Initialize!');
      }
    } else {
      toast.error('Invalid Starting Character!');
    }
  }

  async function undoChangeLogAction(actionObj: ChangeLogEntry): Promise<void> {
    
  }

  if (areDirectoriesLoading || isInvoiceLoading) {
    return <h1>Loading...</h1>;
  }

  if (directoryError || invoiceError) {
    return (
      <h1>
        <p>Error Occurred: </p>
        <p>{invoiceError?.message}</p>
        <p>{directoryError?.message}</p>
      </h1>
    );
  }

  return (
    <>
      <SortersNavBar sorterTitle={sorterTitle} triggerSorting={validateCurrentSelections} triggerModal={toggleModal} />
      <main className="h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-y-auto w-screen bg-background">
        <div className="w-full h-full flex flex-row p-2">
          <div className="w-1/3 h-full flex flex-col gap-1">
            {directoriesArrays !== undefined && <DirectoryNavigation disabled={isInteractionDisabled} directoriesArrays={directoriesArrays} selectedDirectory={selectedDirectory} updateSelectedDirectory={updateSelectedDirectory} updateCurrentYear={setSelectedYear} />}
            <ChangeLog triggerChangeLog={toggleDrawer} />
          </div>

          {invoiceObj !== undefined && <InvoiceDisplay disabled={isInteractionDisabled} invoiceFileData={invoiceObj.data} />}
        </div>
      </main>
      <Toaster />
      <NewDirectoryModal isOpen={isModalOpen} changeOpen={toggleModal} createNewDirectory={createNewDirectory} newDirectoryName={newDirectoryName} setNewDirectoryName={setNewDirectoryName} />
      <ChangeLogDrawer isDrawerOpen={isDrawerOpen} triggerChangeLog={toggleDrawer} changeLog={changeLog} />
    </>
  );
}
