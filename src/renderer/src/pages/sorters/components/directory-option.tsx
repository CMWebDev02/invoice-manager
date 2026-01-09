import { Button } from '@renderer/components/ui/button';
import type { DirectoryExport } from '@renderer/lib/types';

interface DirectoryOptionProps {
  directoryObject: DirectoryExport;
  currentDirectory: DirectoryExport;
  updateCurrentDirectory: (dirName: DirectoryExport) => void;
}

export default function DirectoryOption({ directoryObject, currentDirectory, updateCurrentDirectory }: DirectoryOptionProps): React.JSX.Element {
  const { name, dirPath } = directoryObject;
  const backGroundColor = currentDirectory.name === name ? 'red-900' : 'background';

  return (
    <div>
      <Button className={`w-5/6 bg-${backGroundColor} `} onClick={() => updateCurrentDirectory(directoryObject)}>
        {name}
      </Button>
      <Button className="w-1/6">-{'>'}</Button>
    </div>
  );
}
