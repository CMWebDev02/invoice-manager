import { Button } from '@renderer/components/ui/button';
import { FileSystem } from '@renderer/lib/file-system';
import { cn } from '@renderer/lib/utils';
import { type Dirent } from 'fs';
import { useMemo } from 'react';

interface DirectoryListProps {
  directoriesArray: Dirent[];
  asyncFetchError: unknown;
  updateCurrentDirectoryPath: (dirPath: string) => void;
  selectedDirectoryPath: string;
  updateSelectDirectoryPath: (dirPath: string) => void;
  reversePathTraversal: () => void;
  className?: string;
}

export default function DirectoryList({ directoriesArray, asyncFetchError, updateCurrentDirectoryPath, selectedDirectoryPath, updateSelectDirectoryPath, reversePathTraversal, className }: DirectoryListProps): React.JSX.Element {
  const BackwardsNavigateButton = useMemo(
    () => (
      <Button className="w-full border-2 rounded-none" onClick={reversePathTraversal}>
        ...
      </Button>
    ),
    [reversePathTraversal]
  );
  if (asyncFetchError)
    return (
      // Add an actual error page
      <h1>{JSON.stringify(asyncFetchError)}</h1>
    );

  const values = directoriesArray.map((dir: Dirent) => {
    const childDirPath = FileSystem.joinPaths(dir.parentPath, dir.name);

    return (
      <div key={dir.name} className="flex w-full bg-primary">
        <div
          className={`w-3/4 flex items-center select-none ${childDirPath === selectedDirectoryPath ? 'text-white' : 'text-foreground'}`}
          id={dir.name}
          onClick={() => {
            updateSelectDirectoryPath(childDirPath);
          }}
        >
          {dir.name}
        </div>
        <Button
          onClick={() => {
            updateCurrentDirectoryPath(childDirPath);
          }}
          className="w-1/4"
        >
          -{'>'}
        </Button>
      </div>
    );
  });

  return (
    <div className={cn('w-full', className)}>
      {BackwardsNavigateButton}
      {values}
    </div>
  );
}
