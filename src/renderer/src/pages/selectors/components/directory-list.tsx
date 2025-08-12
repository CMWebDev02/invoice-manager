import { type Dirent } from 'fs';

interface DirectoryListProps {
  directoriesArray: Dirent[];
  asyncFetchError: unknown;
}

export default function DirectoryList({ directoriesArray, asyncFetchError }: DirectoryListProps): React.JSX.Element {
  if (asyncFetchError)
    return (
      // Add an actual error page
      <h1>{JSON.stringify(asyncFetchError)}</h1>
    );

  const values = directoriesArray.map((dir: Dirent) => <div key={dir.name}>{dir.name}</div>);

  return <>{values}</>;
}
