import { Button } from '@renderer/components/ui/button';

interface DirectoryOptionProps {
  dirName: string;
  dirFilePath: string;
  currentDirectory: string;
  updateCurrentDirectory: (dirName: string) => void;
}

export default function DirectoryOption({ dirName, dirFilePath, currentDirectory, updateCurrentDirectory }: DirectoryOptionProps): React.JSX.Element {
  const backGroundColor = currentDirectory === dirName ? 'red-900' : 'background';

  return (
    <div>
      <Button className={`w-5/6 bg-${backGroundColor} `} onClick={() => updateCurrentDirectory(dirName)}>
        {dirName}
      </Button>
      <Button className="w-1/6">-{'>'}</Button>
    </div>
  );
}
