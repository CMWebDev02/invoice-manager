import { useEffect, useState } from 'react';
import WhiteListInput from '@renderer/components/user/white-list-input';
import { titleCharactersBlackList } from '@renderer/lib/patterns';
import { DirectoryExport } from '@renderer/lib/types';
import { Button } from '@renderer/components/ui/button';
import { toast } from 'sonner';
import DirectoryOption from '../../../components/user/directory-option';
import useDebounce from '@renderer/hooks/useDebounce';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';
import FlexColContainer from '@renderer/components/ui/flex-col-container';

interface DirectorySelectorProps {
  disabled: boolean;
  directoriesArrays: DirectoryExport[][];
  updateSelectedDirectory: (dirObj: DirectoryExport) => void;
  useStrictInputs: boolean;
  autoSelectText: boolean;
}

export default function DirectorySelector({ disabled, directoriesArrays, updateSelectedDirectory, useStrictInputs, autoSelectText }: DirectorySelectorProps): React.JSX.Element {
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
          const directoryName = !useStrictInputs ? directory.name : directory.name.toUpperCase();
          const comparedTextInput = !useStrictInputs ? textInput : textInput.toUpperCase();

          return directoryName.startsWith(comparedTextInput);
        });
        setFilteredDirectories(filteredArray);
      } else {
        setFilteredDirectories([]);
      }
    }

    reFilter();
  }, [directoriesArrays, filterString, useStrictInputs]);

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

  // Selects all text in the text box upon entering it
  function selectAllText(e: React.SyntheticEvent<HTMLInputElement, Event>): void {
    if (autoSelectText) {
      e.currentTarget.select();
    }
  }

  return (
    <FlexColContainer className="w-full h-full gap-1">
      <FlexRowContainer className="w-full p-1 justify-around items-center h-12 gap-1 ">
        <label htmlFor="search-filter" className="w-auto select-none text-foreground">
          Search:
        </label>
        <WhiteListInput className="w-full rounded-none bg-secondary text-foreground border border-foreground" disabled={disabled} regexBlackList={titleCharactersBlackList} placeholder="Search..." id="search-filter" onChange={(e) => updateSearchString(e)} value={userSearchString} onFocus={(e) => selectAllText(e)} />
      </FlexRowContainer>
      <FlexColContainer className="w-full h-[calc(100%-6rem)] overflow-y-scroll bg-secondary border-2 border-foreground">
        <div className="w-full">
          {filteredDirectories.map((dirObj) => (
            <DirectoryOption key={dirObj.name} directoryObject={dirObj} currentDirectory={currentDirectory} updateCurrentDirectory={updateCurrentDirectory} disabled={disabled} />
          ))}
        </div>
      </FlexColContainer>
      <div className="flex flex-row p-1 justify-around items-center w-full h-12">
        <Button onClick={getSelectedDirSubDirs} className="w-full" variant={'action'} disabled={disabled}>
          Select
        </Button>
      </div>
    </FlexColContainer>
  );
}
