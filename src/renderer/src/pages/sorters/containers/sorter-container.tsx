import InvoiceDisplay from '../../../components/user/invoice-display';
import { getUniqueID, subDirectoriesArray } from '@renderer/lib/utils';
import useFetchData from '../../../hooks/useFetchData';
import type { ChangeLogEntry, DirectoryExport, FileExport } from '@renderer/lib/types';
import { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import NewDirectoryModal from '../components/new-directory-modal';
import ChangeLogDrawer from '../components/changelog-drawer';
import { FileSystem, SorterActions } from '@renderer/lib/file-system';
import LoadingPage from '@renderer/pages/loading/loading-page';
import ErrorPage from '@renderer/components/pages/error-page';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';
import SorterButtons from '../components/sorter-buttons';
import DirectorySelector from './directory-selector';
import NavBar from '@renderer/components/user/nav-bar';
import MenuButton from '@renderer/components/user/menu-button';
import { UserSettings } from '@renderer/lib/user-settings';
import FlexColContainer from '@renderer/components/ui/flex-col-container';

interface SortersContainerProps {
  sorterActions: SorterActions;
}

export default function SorterContainer({ sorterActions }: SortersContainerProps): React.JSX.Element {
  const [isInteractionDisabled, setIsInteractionDisabled] = useState<boolean>(true);
  const [selectedDirectory, setSelectedDirectory] = useState<DirectoryExport | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [newDirectoryName, setNewDirectoryName] = useState<string>('');
  const [changeLog, setChangeLog] = useState<ChangeLogEntry[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Uses the static UserSettings class to access the current user settings
  const userSettings = UserSettings.getUserSettings();

  const toggleModal = (): void => {
    if (isModalOpen) {
      setNewDirectoryName('');
    }

    setIsModalOpen(!isModalOpen);
  };
  const toggleDrawer = (): void => setIsDrawerOpen(!isDrawerOpen);

  const { fetchData: directoriesArrays, error: directoryError, isLoading: areDirectoriesLoading, triggerRefetching: refetchDirectories } = useFetchData<DirectoryExport[][]>({ asyncFunction: sorterActions.getSubDirectories.bind(sorterActions), asyncFunctionKey: 'directories' });
  const { fetchData: invoiceObj, error: invoiceError, isLoading: isInvoiceLoading, triggerRefetching: refetchInvoice } = useFetchData<FileExport | null>({ asyncFunction: sorterActions.getCurrentInvoice.bind(sorterActions), asyncFunctionKey: 'invoices' });

  useEffect(() => {
    if (invoiceObj !== null && invoiceObj !== undefined && directoriesArrays !== undefined) {
      setIsInteractionDisabled(false);
    }
  }, [isInteractionDisabled, invoiceObj, directoriesArrays]);

  function updateSelectedDirectory(dirObj: DirectoryExport): void {
    setSelectedDirectory(dirObj);
  }

  function validateCurrentSelections(): void {
    try {
      if (selectedDirectory === null) throw new Error('No Directory Selected');

      if (selectedYear === '') throw new Error('No Year Selected');

      if (invoiceObj === undefined || invoiceObj === null) throw new Error('Invalid Invoice');

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
      const yearDirPath = await FileSystem.validateSubDir(dir.dirPath, year);
      const newInvoiceLocation = await FileSystem.transferFile(invoice.name, invoice.path, yearDirPath);
      refetchInvoice();
      setChangeLog((changeArray) => {
        const changeId = getUniqueID();

        const newChange: ChangeLogEntry = {
          id: changeId,
          actionType: 'sort',
          actionDetails: {
            itemName: invoice.name,
            itemPath: newInvoiceLocation
          },
          successful: true
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
    try {
      if (newDirectoryName === '') {
        toast.error('Name Cannot Be Blank!');
        return;
      }

      const newDirectoryLetterFolder = newDirectoryName[0];

      if (subDirectoriesArray.includes(newDirectoryLetterFolder?.toUpperCase())) {
        const newDirectoryPath = FileSystem.joinPaths(sorterActions.directoryDestination, newDirectoryLetterFolder, newDirectoryName);
        await FileSystem.initializeNewDir(newDirectoryPath);
        setIsInteractionDisabled(true);
        refetchDirectories();
        toggleModal();
        setChangeLog((changeArray) => {
          const changeId = getUniqueID();

          const newChange: ChangeLogEntry = {
            id: changeId,
            actionType: 'create',
            actionDetails: {
              itemName: newDirectoryName,
              itemPath: newDirectoryPath
            },
            successful: true
          };
          return [newChange, ...changeArray];
        });
      } else {
        toast.error('Invalid Starting Character!');
        return;
      }
    } catch (error) {
      // Checks if the error is specific
      if (error instanceof Error && error.cause == 'DirExisting') {
        toast.error('Directory Name Already In Use');
      } else {
        // Else provides generic error message
        toast.error('Failed to Create New Directory');
      }
    }
  }

  async function undoChangeLogAction(actionObj: ChangeLogEntry): Promise<void> {
    try {
      setIsInteractionDisabled(true);
      if (actionObj.actionType === 'create') {
        await FileSystem.removeDirectory(actionObj.actionDetails.itemPath);
      } else if (actionObj.actionType === 'sort') {
        await FileSystem.transferFile(actionObj.actionDetails.itemName, actionObj.actionDetails.itemPath, sorterActions.invoicesDestination);
      } else {
        throw new Error('Invalid Action Type!');
      }

      setChangeLog((changeArray) => {
        const currentArray = changeArray.filter((change) => change.id !== actionObj.id);

        const changeId = getUniqueID();
        const newChange: ChangeLogEntry = {
          id: changeId,
          actionType: actionObj.actionType === 'create' ? 'undoCreate' : 'undoSort',
          actionDetails: {
            itemName: actionObj.actionDetails.itemName,
            itemPath: actionObj.actionDetails.itemPath
          },
          successful: true
        };

        return [newChange, ...currentArray];
      });
      toast.success('Action Undone!');
    } catch (error) {
      // Updates the change log to show the failed undo action
      setChangeLog((changeArray) => {
        const changeId = getUniqueID();
        const newChange: ChangeLogEntry = {
          id: changeId,
          actionType: actionObj.actionType === 'create' ? 'undoCreate' : 'undoSort',
          actionDetails: {
            itemName: actionObj.actionDetails.itemName,
            itemPath: actionObj.actionDetails.itemPath
          },
          successful: false
        };

        return [newChange, ...changeArray];
      });

      // Checks if the undo error is specific
      if (error instanceof Error && error.cause == 'DirNotEmpty') {
        toast.error('Nonempty Directories Cannot Be Removed!');
      } else {
        // If no specific errors occur, a generic error message is shown
        toast.error('Undo Failed!');
      }
      // In the instance where no changes are made to the directories or current invoice,
      // the interaction needs to be reenabled
      setIsInteractionDisabled(false);
    } finally {
      refetchInvoice();
      refetchDirectories();
    }
  }

  if (areDirectoriesLoading || isInvoiceLoading) {
    return <LoadingPage />;
  }

  if (directoryError !== null || invoiceError !== null) {
    const errors: Error[] = [];
    if (directoryError !== null) errors.push(directoryError);
    if (invoiceError !== null) errors.push(invoiceError);
    return <ErrorPage errors={errors} />;
  }

  return (
    <>
      <NavBar>
        <h1 className="text-3xl select-none">Sorter - {sorterActions.sorterTitle}</h1>
        <MenuButton />
      </NavBar>
      <main className="h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-y-auto w-screen bg-background">
        <FlexRowContainer className="w-full h-full p-2">
          <FlexColContainer className="w-1/3 h-full justify-between p-2 items-center">
            {directoriesArrays !== undefined && <DirectorySelector disabled={isInteractionDisabled} directoriesArrays={directoriesArrays} selectedDirectory={selectedDirectory} updateSelectedDirectory={updateSelectedDirectory} updateCurrentYear={setSelectedYear} useStrictInputs={userSettings.strictInputs} />}
            <SorterButtons triggerSorting={validateCurrentSelections} triggerModal={toggleModal} triggerChangeLog={toggleDrawer} />
          </FlexColContainer>

          <FlexRowContainer className="w-2/3 h-full items-center p-2">{invoiceObj !== undefined && invoiceObj !== null && <InvoiceDisplay disabled={isInteractionDisabled} invoiceFile={invoiceObj} />}</FlexRowContainer>
        </FlexRowContainer>
      </main>
      <Toaster />
      <NewDirectoryModal isOpen={isModalOpen} changeOpen={toggleModal} createNewDirectory={createNewDirectory} newDirectoryName={newDirectoryName} setNewDirectoryName={setNewDirectoryName} />
      <ChangeLogDrawer isDrawerOpen={isDrawerOpen} triggerChangeLog={toggleDrawer} changeLog={changeLog} undoChangeLogAction={undoChangeLogAction} />
    </>
  );
}
