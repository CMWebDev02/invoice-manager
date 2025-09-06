import { cn } from '@renderer/lib/utils';
import { type ChangeEvent } from 'react';

interface DiskSelectorProps {
  drivesList: string[];
  updateCurrentDirectoryPath: (dirPath: string) => void;
  className?: string;
}

export default function DiskSelector({ drivesList, updateCurrentDirectoryPath, className }: DiskSelectorProps): React.JSX.Element {
  //   Pulls the current directories for the selected drive upon selecting a new drive.
  function setDrivePath(e: ChangeEvent<HTMLSelectElement>): void {
    if (e.target.value !== 'N/A') {
      const drivePath = e.target.value;
      // Appends the ':\\' to the drive letter
      updateCurrentDirectoryPath(`${drivePath}:\\`);
    }
  }

  return (
    <select onChange={setDrivePath} className={cn(className)}>
      <option value={'N/A'}>Select Drive</option>
      {drivesList.length > 0 &&
        drivesList.map((drive) => (
          <option key={drive} value={drive}>
            {drive}
          </option>
        ))}
    </select>
  );
}
