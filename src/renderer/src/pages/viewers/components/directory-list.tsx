import { Button } from '@renderer/components/ui/button';
import FlexColContainer from '@renderer/components/ui/flex-col-container';
import { DirectoryContent } from '@renderer/lib/types';

interface DirectoryListProps {
  subDirs: DirectoryContent[];
  updateCurrentPath: React.Dispatch<React.SetStateAction<string>>;
  getInvoice: (path: DirectoryContent) => Promise<void>;
  disabled: boolean;
}

export default function DirectoryList({ subDirs, updateCurrentPath, getInvoice, disabled }: DirectoryListProps): React.JSX.Element {
  const values = subDirs.map((path: DirectoryContent) => {
    if (path.isDir) {
      return (
        <Button
          key={path.name}
          className="w-full flex justify-between bg-primary hover:text-accent"
          variant={'action'}
          onClick={() => {
            updateCurrentPath(path.path);
          }}
          disabled={disabled}
        >
          <p>{path.name}</p>
          <p>{'>'}</p>
        </Button>
      );
    } else {
      return (
        <Button
          key={path.name}
          className="w-full flex justify-between bg-primary hover:text-accent"
          variant={'action'}
          onClick={() => {
            getInvoice(path);
          }}
          disabled={disabled}
        >
          <p>{path.name}</p>
          <p>^</p>
        </Button>
      );
    }
  });

  return (
    <FlexColContainer className="h-[calc(100%-3rem)] w-full border border-foreground bg-secondary">
      {values}
    </FlexColContainer>
  );
}
