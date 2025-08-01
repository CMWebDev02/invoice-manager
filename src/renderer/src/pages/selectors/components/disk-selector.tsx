import { type ChangeEvent } from 'react';

interface DiskSelectorProps {
  drivesList: string[];
  changeDirectories: (dirPath: string) => Promise<void>;
}

export default function DiskSelector({ drivesList, changeDirectories }: DiskSelectorProps): React.JSX.Element {
  //   Pulls the current directories for the selected drive upon selecting a new drive.
  function setDrivePath(e: ChangeEvent<HTMLSelectElement>): void {
    if (e.target.value !== 'N/A') {
      const drivePath = e.target.value;
      // changeDirectories(`${drivePath}\\`);
    }
  }

  return (
    <select onChange={setDrivePath}>
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
