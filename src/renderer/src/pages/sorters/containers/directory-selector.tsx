import YearSelector from '../components/year-selector';
import { useEffect, useState } from 'react';
import WhiteListInput from '@renderer/components/user/white-list-input';
import { titleCharactersWhiteList } from '@renderer/lib/patterns';
import DirectoryOption from '@renderer/components/user/directory-option';
import { DirectoryExport } from '@renderer/lib/types';
import useDebounce from '@renderer/hooks/useDebounce';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';
import FlexColContainer from '@renderer/components/ui/flex-col-container';

interface DirectorySelectorProps {
  disabled: boolean;
  directoriesArrays: DirectoryExport[][];
  selectedDirectory: DirectoryExport | null;
  updateSelectedDirectory: (dirObj: DirectoryExport) => void;
  updateCurrentYear: React.Dispatch<React.SetStateAction<string>>;
  useStrictInputs: boolean;
}

export default function DirectorySelector({ disabled, directoriesArrays, selectedDirectory, updateSelectedDirectory, updateCurrentYear, useStrictInputs }: DirectorySelectorProps): React.JSX.Element {
  const [userSearchString, setUserSearchString] = useState<string>('');
  const [filteredDirectories, setFilteredDirectories] = useState<DirectoryExport[]>([]);
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

  return (
    <div className="w-full h-11/12">
      <FlexRowContainer className="w-full p-1 justify-around items-center h-24 xl:h-12 gap-0 xl:gap-2">
        <div className="w-2/3 xl:w-full flex flex-col xl:flex-row gap-0 xl:gap-2 items-center align-middle">
          <label htmlFor="search-filter" className="w-full xl:w-auto select-none">
            Search:
          </label>
          <WhiteListInput disabled={disabled} regexWhiteList={titleCharactersWhiteList} placeholder="Search..." id={'search-filter'} onChange={(e) => updateSearchString(e)} value={userSearchString} className="w-full rounded-none bg-secondary text-foreground border border-foreground" />
        </div>
        <div className="w-1/3 xl:w-auto flex flex-col xl:flex-row items-center align-middle xl:gap-2">
          <label htmlFor="year-selector" className="w-full xl:w-auto select-none">
            Year:
          </label>
          <YearSelector disabled={disabled} updateCurrentYear={updateCurrentYear} className="w-full xl:w-auto" id="year-selector" />
        </div>
      </FlexRowContainer>
      <FlexColContainer className="w-full h-[calc(100%-6rem)] xl:h-[calc(100%-3rem)] overflow-y-scroll bg-secondary border-2 border-foreground">
        {filteredDirectories.map((dirObj) => (
          <DirectoryOption key={dirObj.name} directoryObject={dirObj} currentDirectory={selectedDirectory} updateCurrentDirectory={updateSelectedDirectory} disabled={disabled} />
        ))}
      </FlexColContainer>
    </div>
  );
}
