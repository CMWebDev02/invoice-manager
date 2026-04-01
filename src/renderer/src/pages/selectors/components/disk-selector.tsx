import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@renderer/components/ui/select';
import { cn } from '@renderer/lib/utils';
import { type ChangeEvent } from 'react';

interface DiskSelectorProps {
  drivesList: string[];
  updateCurrentDirectoryPath: (dirPath: string) => void;
  className?: string;
}

export default function DiskSelector({ drivesList, updateCurrentDirectoryPath, className }: DiskSelectorProps): React.JSX.Element {
  //   Pulls the current directories for the selected drive upon selecting a new drive.
  function setDrivePath(value: string): void {
    if (value !== 'N/A') {
      const drivePath = value;
      // Appends the ':\\' to the drive letter
      updateCurrentDirectoryPath(`${drivePath}:\\`);
    }
  }

  return (
    <Select onValueChange={setDrivePath}>
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder="Select a Disk" />
      </SelectTrigger>
      <SelectContent className="bg-navbar text-foreground">
        <SelectGroup>
          {drivesList.length > 0 &&
            drivesList.map((drive) => (
              <SelectItem key={drive} value={drive} className="focus:bg-foreground focus:text-white">
                {drive}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
