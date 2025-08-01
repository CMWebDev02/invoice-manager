import { Button } from '@renderer/components/ui/button';
import { DialogContent, DialogDescription, DialogHeader } from '@renderer/components/ui/dialog';
import { Input } from '@renderer/components/ui/input';
import { Label } from '@renderer/components/ui/label';
import { getAllDrives } from '@renderer/lib/utils';
import { useEffect, useState } from 'react';
import DirectorySelector from './directory-selector';

export default function SortersModal(): React.JSX.Element {
  // Possibly move this up a parent component to allow for reusing the same call to get the drives list.
  const [drivesList, setDrivesList] = useState<string[]>([]);

  function updateCurrentSavePath(dirPath: string): void {
    console.log(dirPath);
  }

  useEffect(() => {
    async function getUserDrives(): Promise<void> {
      const userDrives = await getAllDrives();
      console.log(userDrives);
      setDrivesList(userDrives);
    }
    getUserDrives();
  }, []);

  return (
    <DialogContent>
      <DialogHeader>
        <Button>Save</Button>
      </DialogHeader>
      <DialogDescription>
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
      </DialogDescription>
    </DialogContent>
  );
}
