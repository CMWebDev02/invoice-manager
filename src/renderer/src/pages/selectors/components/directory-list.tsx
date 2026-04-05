import { Button } from '@renderer/components/ui/button';
import { FileSystem } from '@renderer/lib/file-system';
import { cn } from '@renderer/lib/utils';
import { type Dirent } from 'fs';
import { useMemo } from 'react';

interface DirectoryListProps {
  directoriesArray: Dirent[];
  updateCurrentDirectoryPath: (dirPath: string) => void;
  selectedDirectoryPath: string;
  updateSelectDirectoryPath: (dirPath: string) => void;
  reversePathTraversal: () => void;
  className?: string;
}

export default function DirectoryList({ directoriesArray, updateCurrentDirectoryPath, selectedDirectoryPath, updateSelectDirectoryPath, reversePathTraversal, className }: DirectoryListProps): React.JSX.Element {
  const BackwardsNavigateButton = useMemo(
    () => (
      <Button className={`w-full flex justify-center select-none outline-none rounded-none border-2 border-accent hover:text-accent`} onClick={reversePathTraversal}>
        ...
      </Button>
    ),
    [reversePathTraversal]
  );

  const DirectoryOptions = useMemo(() => {
    return directoriesArray.map((dir: Dirent) => {
      const childDirPath = FileSystem.joinPaths(dir.parentPath, dir.name);

      return (
        <div key={dir.name} className="flex w-full bg-primary">
          <Button
            className={`w-3/4 flex justify-start select-none outline-none rounded-none border-2 border-accent hover:text-accent
            ${childDirPath === selectedDirectoryPath ? 'text-red-600 bg-secondary/20' : 'text-foreground bg-secondary'}`}
            id={dir.name}
            onClick={() => {
              updateSelectDirectoryPath(childDirPath);
            }}
          >
            {dir.name}
          </Button>
          <Button
            onClick={() => {
              updateCurrentDirectoryPath(childDirPath);
            }}
            className="w-1/4 text-foreground bg-secondary select-none outline-none rounded-none border-2 border-accent hover:text-accent"
          >
            {'>'}
          </Button>
        </div>
      );
    });
  }, [directoriesArray, selectedDirectoryPath, updateCurrentDirectoryPath, updateSelectDirectoryPath]);

  return (
    <div className={cn('w-full', className)}>
      {BackwardsNavigateButton}
      {DirectoryOptions}
    </div>
  );
}
