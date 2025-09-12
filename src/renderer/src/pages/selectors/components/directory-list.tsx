import { Button } from '@renderer/components/ui/button';
import { cn, joinPaths } from '@renderer/lib/utils';
import { type Dirent } from 'fs';
import { useMemo } from 'react';

interface DirectoryListProps {
  directoriesArray: Dirent[];
  asyncFetchError: unknown;
  updateCurrentDirectoryPath: (dirPath: string) => void;
  selectDirectoryPath: (dirPath: string) => void;
  reversePathTraversal: () => void;
  className?: string;
}

// Have each list item be selectable
// Once a user clicks the item
// It highlights red to indicate it currently selected
// Once the user clicks save, then the dir.name is used to update the selected directory path var

// Directory Selection
// INIT selectedDirectory
// Get selectedDirectory // once a user clicks a directory, use its dir.name value to store in selectedDirectory
// For each div in directoriesArray
//  IF dir.name === selectedDirectory THEN
//  "text-red"
//  ELSE
//  "text-primary"
//  ENDIF
// ENDFOR

// Directory Saving
// ON user clicking Save Button
// Call saveSelectedDirectory(dir: string)
// FUNCTION saveSelectedDirectory
//  
// ENDFUNCTION

export default function DirectoryList({ directoriesArray, asyncFetchError, updateCurrentDirectoryPath, selectDirectoryPath, reversePathTraversal, className }: DirectoryListProps): React.JSX.Element {
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

  function updateDirectoryPath(dirParentPath: string, dirName: string, updateHandler: 'selection' | 'navigation'): void {
    const childDirPath = joinPaths(dirParentPath, dirName);

    // Checks if the child path updates the navigation directory path or the selected directory path
    if (updateHandler === 'selection') {
      selectDirectoryPath(childDirPath);
    } else {
      updateCurrentDirectoryPath(childDirPath);
    }
  }

  const values = directoriesArray.map((dir: Dirent) => (
    <div key={dir.name} className="flex w-full bg-primary">
      <div
        className={`w-3/4 flex items-center select-none ${dir.name === selectDirectoryPath}`}
        id={dir.name}
        onClick={() => {
          updateDirectoryPath(dir.parentPath, dir.name, 'selection');
        }}
      >
        {dir.name}
      </div>
      <Button
        onClick={() => {
          updateDirectoryPath(dir.parentPath, dir.name, 'navigation');
        }}
        className="w-1/4"
      >
        -{'>'}
      </Button>
    </div>
  ));

  return (
    <div className={cn('w-full', className)}>
      {BackwardsNavigateButton}
      {values}
    </div>
  );
}
