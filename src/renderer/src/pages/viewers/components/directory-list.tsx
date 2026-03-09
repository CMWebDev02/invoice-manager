import { Button } from '@renderer/components/ui/button';
import { FileSystem } from '@renderer/lib/file-system';
import { Dirent } from 'fs';
import { useMemo } from 'react';

interface DirectoryListProps {
  reversePathTraversal: () => void;
  subDirs: Dirent<string>[];
  updateCurrentPath: React.Dispatch<React.SetStateAction<string>>;
}

export default function DirectoryList({ subDirs, reversePathTraversal, updateCurrentPath }: DirectoryListProps): React.JSX.Element {
  const BackwardsNavigateButton = useMemo(
    () => (
      <Button className="w-full border-2 rounded-none" onClick={reversePathTraversal}>
        ...
      </Button>
    ),
    [reversePathTraversal]
  );

  const values = subDirs.map((dir: Dirent) => {
    const childDirPath = FileSystem.joinPaths(dir.parentPath, dir.name);

    return (
      <div key={dir.name} className="flex w-full bg-primary">
        <div className={`w-3/4 flex items-center select-none text-foreground`} id={dir.name}>
          {dir.name}
        </div>
        <Button
          onClick={() => {
            updateCurrentPath(childDirPath);
          }}
          className="w-1/4"
        >
          -{'>'}
        </Button>
      </div>
    );
  });

  return (
    <>
      {BackwardsNavigateButton}
      {values}
    </>
  );
}
