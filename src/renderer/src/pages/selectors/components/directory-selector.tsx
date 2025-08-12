import { getDirectories } from '@renderer/lib/utils';
import { useState } from 'react';
import DiskSelector from './disk-selector';
import { Button } from '@renderer/components/ui/button';
import useAsyncUpdate from '../hooks/useAsyncUpdate';
import DirectoryList from './directory-list';
import { type Dirent } from 'fs';

interface DirectorySelectorProps {
  updateSavedPath: (dirPath: string) => void;
  drivesList: string[];
}

export default function DirectorySelector({ updateSavedPath, drivesList }: DirectorySelectorProps): React.JSX.Element {
  const [currentDirectoryPath, setCurrentDirectoryPath] = useState<string>('');

  const { updateResults: directoriesArray, isLoading, error: directoriesError } = useAsyncUpdate<string, Dirent[]>({ asyncFunction: getDirectories, updateTrigger: currentDirectoryPath });

  function updateCurrentDirectoryPath(dirPath: string): void {
    setCurrentDirectoryPath(dirPath);
  }

  return (
    <div>
      <div>
        <DiskSelector drivesList={drivesList} updateCurrentDirectoryPath={updateCurrentDirectoryPath} />

        <h2>{currentDirectoryPath}</h2>

        {/* Add an actual loading icon */}
        {isLoading ? <div>loading</div> : <DirectoryList directoriesArray={directoriesArray} asyncFetchError={directoriesError} />}

        {/* Updates the selected folder to be the new saved path */}
        <Button onClick={() => updateSavedPath(currentDirectoryPath)}>Save Dir</Button>
      </div>
    </div>
  );
}
