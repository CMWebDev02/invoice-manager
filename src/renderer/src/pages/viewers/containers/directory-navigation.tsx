import useAsyncUpdate from '@renderer/hooks/useAsyncUpdate';
import { FileSystem } from '@renderer/lib/file-system';
import { useState } from 'react';
import DirectoryList from '../components/directory-list';
import { toast } from 'sonner';
import { Button } from '@renderer/components/ui/button';

interface DirectoryNavigationProps {
  mainDirPath: string;
  returnToSearch: () => void;
}

export default function DirectoryNavigation({ mainDirPath, returnToSearch }: DirectoryNavigationProps): React.JSX.Element {
  const [currentDirPath, setCurrentDirPath] = useState<string>(mainDirPath);

  const { updateResults: currentDirSubDirs, error: subDirsError, isLoading: areSubDirsLoaded } = useAsyncUpdate({ asyncFunction: FileSystem.getDirectories, updateTrigger: currentDirPath });

  // Traverses to the parent path of the current directory using relative paths.
  function reversePathTraversal(): void {
    // Prevents the user from traversing beyond the initial parent directory
    if (currentDirPath !== mainDirPath) {
      const previousRelativePath = FileSystem.joinPaths(currentDirPath, '..');
      setCurrentDirPath(previousRelativePath);
    } else {
      toast.error('Cannot Go Beyond Parent Directory!');
    }
  }

  if (subDirsError) {
    return <h1>Error Occurred Fetching Directories</h1>;
  }

  if (areSubDirsLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {currentDirSubDirs !== null && <DirectoryList subDirs={currentDirSubDirs} reversePathTraversal={reversePathTraversal} updateCurrentPath={setCurrentDirPath} />}
      <Button onClick={returnToSearch}>Return</Button>
    </>
  );
}
