import { Button } from '@renderer/components/ui/button';
import { DialogContent, DialogHeader } from '@renderer/components/ui/dialog';
import { Label } from '@renderer/components/ui/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import DirectorySelector from './directory-selector';
import { DialogTitle } from '@radix-ui/react-dialog';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';
import FlexColContainer from '@renderer/components/ui/flex-col-container';
import { getUniqueID } from '@renderer/lib/utils';
import { useEffect, useState } from 'react';
import { searchSelector, storeSelector } from '@renderer/lib/store';
import type { SelectorDetails } from '@renderer/lib/types';
import { titleCharactersWhiteList } from '@renderer/lib/patterns';
import WhiteListInput from '@renderer/components/user/white-list-input';
import { FileSystem } from '@renderer/lib/file-system';
import { SorterTest, ViewerTest } from '@renderer/pages/selectors/tests/selectors-tests';
import { toast } from 'sonner';

interface SortersModalProps {
  drivesList: string[];
  toggleModal: () => void;
  existingSelectorId: string;
  selectorType: 'sorters' | 'viewers';
}

export default function SelectorsModal({ drivesList, toggleModal, existingSelectorId, selectorType }: SortersModalProps): React.JSX.Element {
  const [selectorId, setSelectorId] = useState<string>('');
  const [selectorTitle, setSelectorTitle] = useState<string>('');
  const [invoicesDestination, setInvoicesDestination] = useState<string>('');
  const [directoriesDestination, setDirectoriesDestination] = useState<string>('');

  useEffect(() => {
    if (existingSelectorId != '') {
      const existingSorter = searchSelector(selectorType, existingSelectorId);
      setSelectorId(existingSorter.selectorId);
      setSelectorTitle(existingSorter.selectorTitle);
      setInvoicesDestination(existingSorter.invoicesDestination ?? '');
      setDirectoriesDestination(existingSorter.directoriesDestination);
    } else {
      setSelectorId('');
      setSelectorTitle('');
      setInvoicesDestination('');
      setDirectoriesDestination('');
    }
  }, [existingSelectorId, selectorType]);

  function validateChanges(): void {
    try {
      if (selectorTitle === '') {
        throw new Error('Invalid Title Entry', { cause: 'InvalidEntry' });
      }

      if (!titleCharactersWhiteList.test(selectorTitle)) {
        throw new Error('Invalid Title Entry', { cause: 'InvalidEntry' });
      }

      if (selectorType === 'sorters') {
        if (invoicesDestination === '' || directoriesDestination === '') {
          throw new Error('Invalid Invoices and Destinations Entries', { cause: 'InvalidEntry' });
        }
      } else if (selectorType === 'viewers') {
        if (directoriesDestination === '') {
          throw new Error('Invalid Destinations Entry');
        }
      } else {
        throw new Error('Invalid Selector Type', { cause: 'InvalidEntry' });
      }

      saveChanges();
      return;
    } catch (error) {
      if (error instanceof Error && error.cause === 'InvalidEntry') {
        toast.error(error.message);
      } else {
        console.error(error);
        toast.error('An Unknown Error Occurred');
      }
    }
  }

  async function saveChanges(): Promise<void> {
    try {
      const sorterObject: SelectorDetails = {
        selectorId: selectorId,
        selectorTitle: selectorTitle,
        directoriesDestination: directoriesDestination,
        invoicesDestination
      };
      // Indicates if the selector is new or being updated
      let isNewSelector = false;

      // Checks if a new selector is being saved
      if (selectorId == '') {
        // Creates a new id for the new selector
        sorterObject.selectorId = getUniqueID();
        isNewSelector = true;
      }

      // Calls the method to validate the destinations
      if (selectorType === 'sorters') {
        const newSorterTest = new SorterTest(directoriesDestination, invoicesDestination, selectorTitle);
        newSorterTest.initiateTests();
      } else if (selectorType === 'viewers') {
        const newViewerTest = new ViewerTest(directoriesDestination, selectorTitle);
        newViewerTest.initiateTests();
      } else {
        throw new Error(`Failed to save new ${selectorType}!`, { cause: 'UnknownSelectorType' });
      }

      const isStored = await storeSelector(selectorType, sorterObject, isNewSelector);

      if (isStored) {
        toast.success(`New ${selectorType} Saved!`);
        toggleModal();
      } else {
        throw new Error(`Failed to save new ${selectorType}!`, { cause: 'SavingFailed' });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        console.error(error);
        toast.error(`Unknown Error Occurred While Saving new ${selectorType}`);
      }
    }
  }

  async function updateCurrentSavePath(dirPath: string, pathDestination: 'invoices' | 'directories'): Promise<void> {
    if (dirPath !== '') {
      const isValidPath = await FileSystem.validateDirectoryPath(dirPath);
      if (isValidPath && pathDestination === 'invoices') {
        setInvoicesDestination(dirPath);
      } else if (isValidPath && pathDestination === 'directories') {
        setDirectoriesDestination(dirPath);
      }
    }
  }

  // Calls the update path function to update the appropriate destination path
  const updateInvoiceDestinationPath = (dirPath: string): void => {
    updateCurrentSavePath(dirPath, 'invoices');
  };
  const updateDirectoriesDestinationPath = (dirPath: string): void => {
    updateCurrentSavePath(dirPath, 'directories');
  };

  return (
    <DialogContent
      className="
    min-h-80
    h-10/12 md:h-5/6 lg:h-4/5
    w-full
    sm:max-w-5/6
    lg:max-w-3/4
    xl:max-w-1/2
    flex flex-col justify-around
    "
      // Close modal if user clicks outside
      onPointerDownOutside={toggleModal}
      showCloseButton={false}
    >
      <DialogHeader className="flex flex-col h-20">
        <FlexRowContainer className="w-full justify-between">
          <Button onClick={validateChanges} variant="secondary" className="hover:cursor-pointer">
            Save
          </Button>
          <DialogTitle
            className="
          text-lg md:text-2xl lg:text-3xl
          select-none
          "
          >
            Editor
          </DialogTitle>
          <Button onClick={toggleModal} variant="secondary" className="hover:cursor-pointer">
            <FontAwesomeIcon icon={faXmark} size="lg" className="text-red-600" />
          </Button>
        </FlexRowContainer>
        <FlexRowContainer className="gap-4 items-center justify-center">
          <Label
            className=" w-auto
          text-lg md:text-2xl
        "
            htmlFor="selector-title"
          >
            Title:
          </Label>
          {/* // TODO: Figure out why this input is causing rerendering issues */}
          <WhiteListInput className="w-1/2 bg-secondary border border-primary rounded-none outline outline-primary focus-within:border-primary" id="selector-title" value={selectorTitle} onChange={(e) => setSelectorTitle(e.target.value)} regexWhiteList={titleCharactersWhiteList} />
        </FlexRowContainer>
      </DialogHeader>
      <FlexRowContainer className="gap-1 justify-around h-[calc(100%-5rem)] w-full">
        {/* //?Invoices directory selector only displays for sorters page */}
        {selectorType === 'sorters' && (
          <FlexColContainer className="h-full w-1/2 gap-1">
            <FlexColContainer className="h-16">
              <h3 className="md:text-lg">Invoices Destination:</h3>
              <h4 className="border-2 border-secondary bg-primary p-0.5 text-lg min-h-8">{invoicesDestination}</h4>
            </FlexColContainer>
            <DirectorySelector className="h-[calc(100%-4rem)] w-full border-2 border-secondary rounded-t-2xl p-2 bg-secondary" updateSavedPath={updateInvoiceDestinationPath} drivesList={drivesList} />
          </FlexColContainer>
        )}

        <FlexColContainer className="h-full w-1/2 gap-1">
          <FlexColContainer className="h-16">
            <h3 className="md:text-lg">Directories Destination:</h3>
            <h4 className="border-2 border-secondary bg-primary p-0.5 text-lg min-h-8">{directoriesDestination}</h4>
          </FlexColContainer>
          <DirectorySelector className="h-[calc(100%-4rem)] w-full border-2 border-secondary rounded-t-2xl p-2 bg-secondary" updateSavedPath={updateDirectoriesDestinationPath} drivesList={drivesList} />
        </FlexColContainer>
      </FlexRowContainer>
    </DialogContent>
  );
}
