import { Button } from '@renderer/components/ui/button';
import { DirectoryContent } from '@renderer/lib/types';
import { useMemo } from 'react';

interface DirectoryListProps {
  reversePathTraversal: () => void;
  subDirs: DirectoryContent[];
  updateCurrentPath: React.Dispatch<React.SetStateAction<string>>;
  getInvoice: (path: DirectoryContent) => Promise<void>;
  disabled: boolean;
}

export default function DirectoryList({ subDirs, reversePathTraversal, updateCurrentPath, getInvoice, disabled }: DirectoryListProps): React.JSX.Element {
  const BackwardsNavigateButton = useMemo(
    () => (
      <Button className="w-full border-2 rounded-none" onClick={reversePathTraversal}>
        ...
      </Button>
    ),
    [reversePathTraversal]
  );

  const values = subDirs.map((path: DirectoryContent) => {
    return (
      <div key={path.name} className="flex w-full bg-primary">
        <div className={`w-3/4 flex items-center select-none text-foreground`} id={path.name}>
          {path.name}
        </div>
        {/* Only displays the directory navigation button if the path leads to a directory. */}
        {path.isDir ? (
          <Button
            onClick={() => {
              updateCurrentPath(path.path);
            }}
            className="w-1/4"
            disabled={disabled}
          >
            -{'>'}
          </Button>
        ) : (
          <Button
            className="w-1/4"
            onClick={() => {
              getInvoice(path);
            }}
            disabled={disabled}
          >
            ^
          </Button>
        )}
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
