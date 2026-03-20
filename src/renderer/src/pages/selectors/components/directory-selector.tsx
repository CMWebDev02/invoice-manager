import { cn } from '@renderer/lib/utils';
import { useState } from 'react';
import DiskSelector from './disk-selector';
import { Button } from '@renderer/components/ui/button';
import useAsyncUpdate from '../../../hooks/useAsyncUpdate';
import DirectoryList from './directory-list';
import { type Dirent } from 'fs';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';
import { FileSystem } from '@renderer/lib/file-system';
import LoadingIndicator from '@renderer/components/pages/loading-indicator';

interface DirectorySelectorProps {
  updateSavedPath: (dirPath: string) => void;
  drivesList: string[];
  className?: string;
}

export default function DirectorySelector({ updateSavedPath, drivesList, className }: DirectorySelectorProps): React.JSX.Element {
  const [currentDirectoryPath, setCurrentDirectoryPath] = useState<string>(FileSystem.getUserHomeDir());
  const [selectedDirectoryPath, setSelectedDirectoryPath] = useState<string>('');

  const { updateResults: directoriesArray, isLoading, error: directoriesError } = useAsyncUpdate<string, Dirent[]>({ asyncFunction: FileSystem.getDirectories, updateTrigger: currentDirectoryPath });

  function updateCurrentDirectoryPath(dirPath: string): void {
    setCurrentDirectoryPath(dirPath);
    setSelectedDirectoryPath('');
  }

  // Traverses to the parent path of the current directory using relative paths.
  function reversePathTraversal(): void {
    const previousRelativePath = FileSystem.joinPaths(currentDirectoryPath, '..');
    updateCurrentDirectoryPath(previousRelativePath);
  }

  function updateDirectoryPath(dirPath: string): void {
    setSelectedDirectoryPath(dirPath);
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <FlexRowContainer className="flex-wrap justify-around h-16 bg-navbar">
        <DiskSelector drivesList={drivesList} updateCurrentDirectoryPath={updateCurrentDirectoryPath} className="w-1/2" />

        {/* Updates the selected folder to be the new saved path */}
        <Button variant={'navButton'} onClick={() => updateSavedPath(selectedDirectoryPath)} className="w-1/2">
          Save Dir
        </Button>

        <h2 className="w-full">{currentDirectoryPath}</h2>
      </FlexRowContainer>
      {isLoading || directoriesArray === null ? <LoadingIndicator /> : <DirectoryList className="h-[calc(100%-4rem)] overflow-x-hidden overflow-y-auto" directoriesArray={directoriesArray} asyncFetchError={directoriesError} updateCurrentDirectoryPath={updateCurrentDirectoryPath} selectedDirectoryPath={selectedDirectoryPath} updateSelectDirectoryPath={updateDirectoryPath} reversePathTraversal={reversePathTraversal} />}
    </div>
  );
}
