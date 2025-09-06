import { cn, getDirectories, joinPaths, userHomeDir } from '@renderer/lib/utils';
import { useState } from 'react';
import DiskSelector from './disk-selector';
import { Button } from '@renderer/components/ui/button';
import useAsyncUpdate from '../hooks/useAsyncUpdate';
import DirectoryList from './directory-list';
import { type Dirent } from 'fs';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';

interface DirectorySelectorProps {
  updateSavedPath: (dirPath: string) => void;
  drivesList: string[];
  className?: string;
}

export default function DirectorySelector({ updateSavedPath, drivesList, className }: DirectorySelectorProps): React.JSX.Element {
  const [currentDirectoryPath, setCurrentDirectoryPath] = useState<string>(userHomeDir);

  const { updateResults: directoriesArray, isLoading, error: directoriesError } = useAsyncUpdate<string, Dirent[]>({ asyncFunction: getDirectories, updateTrigger: currentDirectoryPath });

  function updateCurrentDirectoryPath(dirPath: string): void {
    setCurrentDirectoryPath(dirPath);
  }

  // Traverses to the parent path of the current directory using relative paths.
  function reversePathTraversal(): void {
    const previousRelativePath = joinPaths(currentDirectoryPath, '..');
    setCurrentDirectoryPath(previousRelativePath);
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <FlexRowContainer className="flex-wrap justify-around h-16 bg-navbar">
        <DiskSelector drivesList={drivesList} updateCurrentDirectoryPath={updateCurrentDirectoryPath} className="w-1/2" />

        {/* Updates the selected folder to be the new saved path */}
        <Button variant={'navButton'} onClick={() => updateSavedPath(currentDirectoryPath)} className="w-1/2">
          Save Dir
        </Button>

        <h2 className="w-full">{currentDirectoryPath}</h2>
      </FlexRowContainer>
      {/* Add an actual loading icon */}
      {isLoading || directoriesArray === null ? <div>loading</div> : <DirectoryList className="h-[calc(100%-4rem)] overflow-x-hidden overflow-y-auto" directoriesArray={directoriesArray} asyncFetchError={directoriesError} updateCurrentDirectoryPath={updateCurrentDirectoryPath} reversePathTraversal={reversePathTraversal} />}
    </div>
  );
}
