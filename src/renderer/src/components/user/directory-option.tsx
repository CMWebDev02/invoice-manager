import { Button } from '@renderer/components/ui/button';
import type { DirectoryExport } from '@renderer/lib/types';

interface DirectoryOptionProps {
  disabled: boolean;
  directoryObject: DirectoryExport;
  currentDirectory: DirectoryExport | null;
  updateCurrentDirectory: (dirName: DirectoryExport) => void;
}

export default function DirectoryOption({ disabled, directoryObject, currentDirectory, updateCurrentDirectory }: DirectoryOptionProps): React.JSX.Element {
  const { name } = directoryObject;
  const isSelected = currentDirectory !== null && currentDirectory.name === name;

  return (
    <Button className={`w-full h-8 lg:h-12 text-sm lg:text-lg ${isSelected ? 'bg-secondary/30 text-white' : 'text-foreground bg-primary'} rounded-none border border-foreground flex justify-start hover:bg-white/70 select-none`} onClick={() => updateCurrentDirectory(directoryObject)} disabled={disabled}>
      <div className="truncate">{name}</div>
    </Button>
  );
}
