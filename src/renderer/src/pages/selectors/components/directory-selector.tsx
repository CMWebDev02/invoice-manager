import { getDirectories } from '@renderer/lib/utils';
import { type Dirent } from 'fs';
import { type ChangeEvent, useState } from 'react';

interface DirectorySelectorProps {
  updateSavedPath: React.Dispatch<React.SetStateAction<string>>;
}

export default function DirectorySelector({ updateSavedPath }: DirectorySelectorProps): React.JSX.Element {
  // Possibly move this up a parent component to allow for reusing the same call to get the drives list.
  const [drivesList, setDrivesList] = useState<string[]>([]);
  const [currentDirectoryPath, setCurrentDirectoryPath] = useState<string>('');

  //   Pulls the current directories for the selected drive upon selecting a new drive.
  function setDrivePath(e: ChangeEvent<HTMLSelectElement>): void {
    if (e.target.value !== 'N/A') {
      const drivePath = e.target.value;
      changeDirectories(`${drivePath}\\`);
    }
  }

  function changeDirectories(dirPath: string): string[] {
    //change to Dirent[]
    return getDirectories(dirPath);
  }

  // If an empty string is passed in the folders in the user's home directory will be returned.
  const DirectoryOptions = changeDirectories('').map((directoryOption) => {
    // Need to pull directory name and have an onClick to set the current directory to the full directory path
    return <div key={directoryOption}>{directoryOption}</div>;
  });

  return (
    <div>
      <div>
        {/* Make into a separate component with the setDrivePath logic */}
        {/* Component that allows for navigation of different drive paths
        once a drive is changed, the call to the directories within the drive is made */}
        <select onChange={setDrivePath}>
          <option value={'N/A'}>Select Drive</option>
          {drivesList.length > 0 && drivesList.map((drive) => <option key={drive}>{drive}</option>)}
        </select>

        <h2>{currentDirectoryPath}</h2>

        {/* Updates the selected folder to be the new saved path */}
        <button onClick={() => updateSavedPath(currentDirectoryPath)}>Save</button>
      </div>

      <div>{DirectoryOptions}</div>
    </div>
  );
}
