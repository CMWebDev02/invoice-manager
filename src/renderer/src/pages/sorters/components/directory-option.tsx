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
  const backGroundColor = currentDirectory !== null && currentDirectory.name === name ? 'red-900' : 'background';

  return (
    <div>
      <Button className={`w-5/6 bg-${backGroundColor}`} onClick={() => updateCurrentDirectory(directoryObject)} disabled={disabled}>
        {name}
      </Button>
    </div>
  );
}
