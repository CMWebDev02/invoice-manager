import { getDirectories } from '@renderer/lib/utils';
import { Dirent } from 'fs';
import { useState } from 'react';
import DiskSelector from './disk-selector';
import { Button } from '@renderer/components/ui/button';

interface DirectorySelectorProps {
  updateSavedPath: (dirPath: string) => void;
  drivesList: string[];
}

export default function DirectorySelector({ updateSavedPath, drivesList }: DirectorySelectorProps): React.JSX.Element {
  const [currentDirectoryPath, setCurrentDirectoryPath] = useState<string>('');
  const [directoriesArray, setDirectoriesArray] = useState<Dirent[]>([]);

  async function changeDirectories(dirPath: string): Promise<void> {
    const allDirectories = await getDirectories(dirPath);
    console.log(allDirectories)
    setDirectoriesArray(allDirectories);
  }

  // // Move to a separate file and pass in the directories received from changeDirectories
  // // If an empty string is passed in the folders in the user's home directory will be returned.
  // const DirectoryOptions = changeDirectories('').map((directoryOption) => {
  //   // Need to pull directory name and have an onClick to set the current directory to the full directory path
  //   return <div key={directoryOption}>{directoryOption.name}</div>;
  // });

  return (
    <div>
      <div>
        <DiskSelector drivesList={drivesList} changeDirectories={changeDirectories} />

        <h2>{currentDirectoryPath}</h2>

        {/* Updates the selected folder to be the new saved path */}
        <Button onClick={() => updateSavedPath(currentDirectoryPath)}>Save Dir</Button>
      </div>

      {/* <div>{DirectoryOptions}</div> */}
    </div>
  );
}
