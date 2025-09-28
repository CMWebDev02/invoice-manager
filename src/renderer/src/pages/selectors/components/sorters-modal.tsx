import { Button, buttonVariants } from '@renderer/components/ui/button';
import { DialogContent, DialogHeader, DialogTrigger } from '@renderer/components/ui/dialog';
import { Input } from '@renderer/components/ui/input';
import { Label } from '@renderer/components/ui/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import DirectorySelector from './directory-selector';
import { DialogTitle } from '@radix-ui/react-dialog';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';
import FlexColContainer from '@renderer/components/ui/flex-col-container';
import { validateDirectoryPath } from '@renderer/lib/utils';
import { useState } from 'react';

interface SortersModalProps {
  drivesList: string[];
}

export default function SortersModal({ drivesList }: SortersModalProps): React.JSX.Element {
  const [invoicesDestination, setInvoicesDestination] = useState<string>('');
  const [directoriesDestination, setDirectoriesDestination] = useState<string>('');
  const [sorterTitle, setSorterTitle] = useState<string>('');

  async function updateCurrentSavePath(dirPath: string, pathDestination: 'invoices' | 'directories'): Promise<void> {
    if (dirPath !== '') {
      const isValidPath = await validateDirectoryPath(dirPath);
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
    flex flex-col justify-around
    "
      showCloseButton={false}
    >
      <DialogHeader className="flex flex-col h-20">
        <FlexRowContainer className="w-full justify-between">
          <Button>Save</Button>
          <DialogTitle
            className="
          text-lg md:text-2xl lg:text-3xl
          select-none
          "
          >
            Editor
          </DialogTitle>
          <DialogTrigger className={buttonVariants({ variant: 'default' })}>
            <FontAwesomeIcon icon={faXmark} size="lg" />
          </DialogTrigger>
        </FlexRowContainer>
        <FlexRowContainer className="gap-4 items-center">
          <Label
            className="w-1/4 md:w-1/3
          text-lg md:text-2xl
        "
            htmlFor="sorter-title"
          >
            Sorter Title:
          </Label>
          <Input className="w-3/4 md:w-2/3" id="sorter-title" value={sorterTitle} onChange={(e) => setSorterTitle(e.target.value)} />
        </FlexRowContainer>
      </DialogHeader>
      <FlexRowContainer className="gap-1 justify-around h-[calc(100%-5rem)]">
        <div className="h-full">
          <FlexColContainer className="h-16">
            <h3 className="md:text-lg">Invoices Destination</h3>
            <h4>{invoicesDestination}</h4>
          </FlexColContainer>
          <DirectorySelector className="h-[calc(100%-4rem)] w-full" updateSavedPath={updateInvoiceDestinationPath} drivesList={drivesList} />
        </div>

        <div className="h-full">
          <FlexColContainer className="h-16">
            <h3 className="md:text-lg">Directories Destination</h3>
            <h4>{directoriesDestination}</h4>
          </FlexColContainer>
          <DirectorySelector className="h-[calc(100%-4rem)] w-full" updateSavedPath={updateDirectoriesDestinationPath} drivesList={drivesList} />
        </div>
      </FlexRowContainer>
    </DialogContent>
  );
}
