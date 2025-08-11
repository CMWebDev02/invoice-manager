import { type Dirent } from 'fs';

interface DirectoryListProps {
  directoriesArray: unknown;
  asyncFetchError: unknown;
}

export default function DirectoryList({ directoriesArray, asyncFetchError }: DirectoryListProps): React.JSX.Element {
  try {
    if (asyncFetchError) throw new Error('Async Hook Failed');
    // Confirms that the passed in unknown value is an array containing Dirent elements
    //? I did this to allow the reuse of the useAsyncFunction hook, this allows for it to return the unknown type but it requires verifying the type before using it.
    if (directoriesArray instanceof Array) {
      const values = directoriesArray.map((dir: Dirent) => <div key={dir.name}>{dir.name}</div>);

      return <div>{values}</div>;
    } else {
      // Replace with an actual loading icon
      return <>Loading</>;
    }
  } catch (error) {
    console.error(error);
    return (
      // Add an actual error page
      <h1>Error</h1>
    );
  }
}
