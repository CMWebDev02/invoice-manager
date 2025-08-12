import { Button } from '@renderer/components/ui/button';
import { joinPaths } from '@renderer/lib/utils';
import { type Dirent } from 'fs';
import { useMemo } from 'react';

interface DirectoryListProps {
  directoriesArray: Dirent[];
  asyncFetchError: unknown;
  updateCurrentDirectoryPath: (dirPath: string) => void;
  reversePathTraversal: () => void;
}

export default function DirectoryList({ directoriesArray, asyncFetchError, updateCurrentDirectoryPath, reversePathTraversal }: DirectoryListProps): React.JSX.Element {
  const BackwardsNavigateButton = useMemo(() => <Button onClick={reversePathTraversal}>...</Button>, [reversePathTraversal]);
  if (asyncFetchError)
    return (
      // Add an actual error page
      <h1>{JSON.stringify(asyncFetchError)}</h1>
    );

  const values = directoriesArray.map((dir: Dirent) => (
    <div key={dir.name} className="flex">
      <div>{dir.name}</div>
      <Button
        onClick={() => {
          const childDirPath = joinPaths(dir.parentPath, dir.name);
          console.log(childDirPath);
          updateCurrentDirectoryPath(childDirPath);
        }}
      >
        -{'>'}
      </Button>
    </div>
  ));

  return (
    <div>
      {BackwardsNavigateButton}
      {values}
    </div>
  );
}
