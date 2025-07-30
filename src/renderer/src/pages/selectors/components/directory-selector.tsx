import { getDirectories } from '@renderer/lib/utils';
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
      getDirectories(`${drivePath}\\`);
    }
  }

  const DirectoryOptions = getDirectories('Temp').map((directoryOption) => {
    return <div key={directoryOption}>{directoryOption}</div>;
  });

  return (
    <div>
      <div>{DirectoryOptions}</div>
      <div>
        {/* Updates the selected folder to be the new saved path */}
        <button onClick={() => updateSavedPath('temp')}>Save</button>

        {/* Make into a separate component with the setDrivePath logic */}
        {/* Component that allows for navigation of different drive paths
        once a drive is changed, the call to the directories within the drive is made */}
        <select onChange={setDrivePath}>
          <option value={'N/A'}>Select Drive</option>
          {drivesList.length > 0 && drivesList.map((drive) => <option key={drive}>{drive}</option>)}
        </select>
      </div>
    </div>
  );
}
