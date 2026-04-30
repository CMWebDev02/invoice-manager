import { Button } from '@renderer/components/ui/button';
import FlexColContainer from '@renderer/components/ui/flex-col-container';
import TextDisplay from '@renderer/components/user/text-display';
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
          className="w-full flex justify-between p-0 bg-primary hover:text-accent"
          variant={'action'}
          onClick={() => {
            updateCurrentPath(path.path);
          }}
          disabled={disabled}
        >
          <TextDisplay className="w-[calc(100%-2.5rem)] h-full flex items-center truncate p-1" text={path.name} />
          <p className="w-10 h-full flex items-center justify-center border-l border-l-foreground">{'>'}</p>
        </Button>
      );
    } else {
      return (
        <Button
          key={path.name}
          className="w-full flex justify-between p-0 bg-primary hover:text-accent"
          variant={'action'}
          onClick={() => {
            getInvoice(path);
          }}
          disabled={disabled}
        >
          <TextDisplay className="w-[calc(100%-2.5rem)] h-full flex items-center truncate p-1" text={path.name} />
          <p className="w-10 h-full flex items-center justify-center border-l border-l-foreground">^</p>
        </Button>
      );
    }
  });

  return <FlexColContainer className="w-full h-full">{values}</FlexColContainer>;
}
