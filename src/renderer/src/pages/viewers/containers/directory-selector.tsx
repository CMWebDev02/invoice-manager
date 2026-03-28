import { useEffect, useState } from 'react';
import WhiteListInput from '@renderer/components/user/white-list-input';
import { titleCharactersWhiteList } from '@renderer/lib/patterns';
import { userSettings } from '@renderer/lib/temp';
import { DirectoryExport } from '@renderer/lib/types';
import { Button } from '@renderer/components/ui/button';
import { toast } from 'sonner';
import DirectoryOption from '../components/directory-option';
import useDebounce from '@renderer/hooks/useDebounce';

interface DirectorySelectorProps {
  disabled: boolean;
  directoriesArrays: DirectoryExport[][];
  updateSelectedDirectory: (dirObj: DirectoryExport) => void;
}

export default function DirectorySelector({ disabled, directoriesArrays, updateSelectedDirectory }: DirectorySelectorProps): React.JSX.Element {
  const [userSearchString, setUserSearchString] = useState<string>('');
  const [filteredDirectories, setFilteredDirectories] = useState<DirectoryExport[]>([]);
  const [currentDirectory, setCurrentDirectory] = useState<DirectoryExport | null>(null);
  const filterString = useDebounce({ updateVar: userSearchString });

  useEffect(() => {
    function reFilter(): void {
      const textInput = filterString;
      // Uppercase the text input to make it easier to determine the subIndex value
      // and offsets the value by 65 to make letters correspond to value 0-25
      const subDirectoryIndex = textInput.toUpperCase().charCodeAt(0) - 65;

      // Checks that the textInput is populated
      if (textInput !== '' && subDirectoryIndex >= 0 && subDirectoryIndex < 26) {
        const filteredArray = directoriesArrays[subDirectoryIndex].filter((directory) => {
          // Performs the necessary check of the directory name based on the user's capitalization setting,
          const directoryName = !userSettings.autoCapitalizeAllInputs ? directory.name : directory.name.toUpperCase();
          const comparedTextInput = !userSettings.autoCapitalizeAllInputs ? textInput : textInput.toUpperCase();

          return directoryName.startsWith(comparedTextInput);
        });
        setFilteredDirectories(filteredArray);
      } else {
        setFilteredDirectories([]);
      }
    }

    reFilter();
  }, [directoriesArrays, filterString]);

  function updateSearchString(e: React.ChangeEvent<HTMLInputElement>): void {
    const textInput = e.target.value;
    setUserSearchString(textInput);
  }

  function updateCurrentDirectory(dirObj: DirectoryExport): void {
    setCurrentDirectory(dirObj);
  }

  async function getSelectedDirSubDirs(): Promise<void> {
    try {
      if (currentDirectory === null) throw new Error('Directory Not Selected');

      updateSelectedDirectory(currentDirectory);
      setCurrentDirectory(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An Unknown Error has Occurred!');
      }
    }
  }

  return (
    <div className="w-full h-11/12 flex-col gap-1">
      <div className="flex flex-row p-1 justify-around items-center w-full h-12">
        <WhiteListInput disabled={disabled} regexWhiteList={titleCharactersWhiteList} placeholder="Search..." onChange={(e) => updateSearchString(e)} value={userSearchString} />
      </div>
      <div className="flex flex-col w-full h-[calc(100%-3rem)] overflow-y-scroll bg-secondary">
        <div className="w-full">
          {filteredDirectories.map((dirObj) => (
            <DirectoryOption key={dirObj.name} directoryObject={dirObj} currentDirectory={currentDirectory} updateCurrentDirectory={updateCurrentDirectory} disabled={disabled} />
          ))}
        </div>
      </div>
      <div className="flex flex-row p-1 justify-around items-center w-full h-12">
        <Button onClick={getSelectedDirSubDirs} className="w-full" disabled={disabled}>
          Select
        </Button>
      </div>
    </div>
  );
}
