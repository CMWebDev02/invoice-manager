import { Button } from '@renderer/components/ui/button';
import { joinChildDir } from '@renderer/lib/utils';
import { type Dirent } from 'fs';

interface DirectoryListProps {
  directoriesArray: Dirent[];
  asyncFetchError: unknown;
  updateCurrentDirectoryPath: (dirPath: string) => void;
}

export default function DirectoryList({ directoriesArray, asyncFetchError, updateCurrentDirectoryPath }: DirectoryListProps): React.JSX.Element {
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
          const childDirPath = joinChildDir(dir.parentPath, dir.name);
          console.log(childDirPath);
          updateCurrentDirectoryPath(childDirPath);
        }}
      >
        -{'>'}
      </Button>
    </div>
  ));

  return <div>{values}</div>;
}
