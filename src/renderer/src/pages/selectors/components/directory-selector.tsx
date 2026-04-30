import { useState } from 'react';
import DiskSelector from './disk-selector';
import { Button } from '@renderer/components/ui/button';
import useAsyncUpdate from '../../../hooks/useAsyncUpdate';
import DirectoryList from './directory-list';
import { type Dirent } from 'fs';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';
import { FileSystem } from '@renderer/lib/file-system';
import LoadingIndicator from '@renderer/components/pages/loading-indicator';
import ErrorPage from '@renderer/components/pages/error-page';
import FlexColContainer from '@renderer/components/ui/flex-col-container';
import TextDisplay from '@renderer/components/user/text-display';

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

  if (directoriesError) {
    return <ErrorPage errors={[directoriesError]} />;
  }

  return (
    <FlexColContainer className={className}>
      <FlexColContainer className="w-full h-18 bg-navbar">
        <FlexRowContainer className="w-full h-1/2">
          <DiskSelector drivesList={drivesList} updateCurrentDirectoryPath={updateCurrentDirectoryPath} className="w-1/2 text-foreground rounded-none border-white border-2 outline-white" />
          {/* Updates the selected folder to be the new saved path */}
          <Button variant={'action'} onClick={() => updateSavedPath(selectedDirectoryPath)} className="w-1/2 rounded-none border-white border-2">
            Save Path
          </Button>
        </FlexRowContainer>

        <TextDisplay className="w-full h-1/2 flex items-center border-white border-2 p-0.5 truncate" text={currentDirectoryPath} />
      </FlexColContainer>
      <FlexColContainer className="w-full h-[calc(100%-4.5rem)] max-h-[calc(100%-4.5rem)]">
        {/* Backwards traversal button is disabled when loading  */}
        <Button className={`w-full h-9 flex justify-center select-none outline-none rounded-none border-2 border-accent hover:text-accent`} onClick={reversePathTraversal} disabled={isLoading}>
          ...
        </Button>
        {isLoading || directoriesArray === null ? <LoadingIndicator /> : <DirectoryList directoriesArray={directoriesArray} updateCurrentDirectoryPath={updateCurrentDirectoryPath} selectedDirectoryPath={selectedDirectoryPath} updateSelectDirectoryPath={updateDirectoryPath} />}
      </FlexColContainer>
    </FlexColContainer>
  );
}
