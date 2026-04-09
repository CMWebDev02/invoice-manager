import useAsyncUpdate from '@renderer/hooks/useAsyncUpdate';
import { FileSystem } from '@renderer/lib/file-system';
import { useState } from 'react';
import DirectoryList from '../components/directory-list';
import { toast } from 'sonner';
import { Button } from '@renderer/components/ui/button';
import { DirectoryContent } from '@renderer/lib/types';
import LoadingIndicator from '@renderer/components/pages/loading-indicator';
import ErrorPage from '@renderer/components/pages/error-page';
import FlexColContainer from '@renderer/components/ui/flex-col-container';

interface DirectoryNavigationProps {
  mainDirPath: string;
  returnToSearch: () => void;
  getDirectoryContents: (dirContents: string) => Promise<DirectoryContent[] | null>;
  getInvoice: (path: DirectoryContent) => Promise<void>;
  disabled: boolean;
}

export default function DirectoryNavigation({ mainDirPath, returnToSearch, getDirectoryContents, getInvoice, disabled }: DirectoryNavigationProps): React.JSX.Element {
  const [currentDirPath, setCurrentDirPath] = useState<string>(mainDirPath);

  const { updateResults: currentDirSubDirs, error: subDirsError, isLoading: areSubDirsLoaded } = useAsyncUpdate({ asyncFunction: getDirectoryContents, updateTrigger: currentDirPath });

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
    return <ErrorPage errors={[subDirsError]} />;
  }

  if (areSubDirsLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <FlexColContainer className="w-full h-full flex-col-reverse justify-between">
      <Button onClick={returnToSearch} disabled={disabled} variant={'action'} className="h-10">
        Return
      </Button>
      {currentDirSubDirs !== null && <DirectoryList subDirs={currentDirSubDirs} reversePathTraversal={reversePathTraversal} updateCurrentPath={setCurrentDirPath} getInvoice={getInvoice} disabled={disabled} />}
    </FlexColContainer>
  );
}
