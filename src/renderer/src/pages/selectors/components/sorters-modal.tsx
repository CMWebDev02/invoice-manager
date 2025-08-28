import { Button, buttonVariants } from '@renderer/components/ui/button';
import { DialogContent, DialogHeader, DialogTrigger } from '@renderer/components/ui/dialog';
import { Input } from '@renderer/components/ui/input';
import { Label } from '@renderer/components/ui/label';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import DirectorySelector from './directory-selector';
import { DialogTitle } from '@radix-ui/react-dialog';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';

interface SortersModalProps {
  drivesList: string[];
}

export default function SortersModal({ drivesList }: SortersModalProps): React.JSX.Element {
  function updateCurrentSavePath(dirPath: string): void {
    console.log(dirPath);
  }

  return (
    <DialogContent
      className="
    min-h-80
    h-10/12 md:h-5/6 lg:h-4/5
    "
      showCloseButton={false}
    >
      <DialogHeader className="flex flex-row justify-between">
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
      </DialogHeader>
      <FlexRowContainer additionalClasses="gap-4">
        <Label className="w-1/4">Sorter Title</Label>
        <Input className="w-3/4" />
      </FlexRowContainer>
      <div>
        <Label>Invoices Destination</Label>
        <Input />
        <div>Directory Selector Goes Here</div>
      </div>
      <div>
        <Label>Directories Destination</Label>
        <Input />
        <DirectorySelector updateSavedPath={updateCurrentSavePath} drivesList={drivesList} />
      </div>
    </DialogContent>
  );
}
