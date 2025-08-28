import { Button } from '@renderer/components/ui/button';
import { DialogContent, DialogHeader } from '@renderer/components/ui/dialog';
import { Input } from '@renderer/components/ui/input';
import { Label } from '@renderer/components/ui/label';

import DirectorySelector from './directory-selector';
import { DialogTitle } from '@radix-ui/react-dialog';

interface SortersModalProps {
  drivesList: string[];
}

export default function SortersModal({ drivesList }: SortersModalProps): React.JSX.Element {
  function updateCurrentSavePath(dirPath: string): void {
    console.log(dirPath);
  }

  return (
    <DialogContent>
      <DialogTitle>Temp</DialogTitle>
      <DialogHeader>
        <Button>Save</Button>
      </DialogHeader>
      <div>
        <Label>Sorter Title</Label>
        <Input />
      </div>
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
