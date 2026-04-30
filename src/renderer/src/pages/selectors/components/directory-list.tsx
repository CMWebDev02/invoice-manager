import { Button } from '@renderer/components/ui/button';
import FlexColContainer from '@renderer/components/ui/flex-col-container';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';
import { FileSystem } from '@renderer/lib/file-system';
import { type Dirent } from 'fs';
import { useMemo } from 'react';

interface DirectoryListProps {
  directoriesArray: Dirent[];
  updateCurrentDirectoryPath: (dirPath: string) => void;
  selectedDirectoryPath: string;
  updateSelectDirectoryPath: (dirPath: string) => void;
}

export default function DirectoryList({ directoriesArray, updateCurrentDirectoryPath, selectedDirectoryPath, updateSelectDirectoryPath }: DirectoryListProps): React.JSX.Element {
  const DirectoryOptions = useMemo(() => {
    return directoriesArray.map((dir: Dirent) => {
      const childDirPath = FileSystem.joinPaths(dir.parentPath, dir.name);

      return (
        <FlexRowContainer key={dir.name} className="w-full h-9 flex bg-primary">
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
        </FlexRowContainer>
      );
    });
  }, [directoriesArray, selectedDirectoryPath, updateCurrentDirectoryPath, updateSelectDirectoryPath]);

  return <FlexColContainer className="w-full h-[calc(100%-2.25rem)] overflow-y-auto">{DirectoryOptions}</FlexColContainer>;
}
