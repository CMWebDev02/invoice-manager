import YearSelector from '../components/year-selector';
import { useState } from 'react';
import WhiteListInput from '@renderer/components/user/white-list-input';
import { titleCharactersWhiteList } from '@renderer/lib/patterns';
import { userSettings } from '@renderer/lib/temp';
import DirectoryOption from '../components/directory-option';
import { DirectoryExport } from '@renderer/lib/types';

interface DirectoryNavigationProps {
  directoriesArrays: DirectoryExport[][];
}

export default function DirectoryNavigation({ directoriesArrays }: DirectoryNavigationProps): React.JSX.Element {
  const [userSearchString, setUserSearchString] = useState<string>('');
  const [filteredDirectories, setFilteredDirectories] = useState<DirectoryExport[]>([]);

  const [selectedDirectory, setSelectedDirectory] = useState<string>('');

  function filterDirectories(e: React.ChangeEvent<HTMLInputElement>): void {
    const textInput = e.target.value;
    // Uppercase the text input to make it easier to determine the subIndex value
    // and offsets the value by 65 to make letters correspond to value 0-25
    const subDirectoryIndex = textInput.toUpperCase().charCodeAt(0) - 65;

    // Checks that the textInput is populated
    if (textInput !== '' || (subDirectoryIndex >= 0 && subDirectoryIndex < 26)) {
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

    // Regardless of value, the search string needs to be updated
    setUserSearchString(textInput);
  }

  function updateSelectedDirectory(dirName: string): void {
    setSelectedDirectory(dirName);
  }

  return (
    <div className="w-1/3">
      <div className="flex flex-row p-1 justify-around items-center w-full h-12">
        <WhiteListInput regexWhiteList={titleCharactersWhiteList} placeholder="Search..." onChange={(e) => filterDirectories(e)} value={userSearchString} />
        <YearSelector />
      </div>
      <div className="flex flex-col w-full h-[calc(100%-3rem)] overflow-y-scroll bg-secondary">
        <div className="w-full">
          {filteredDirectories.map(({ name, dirPath }) => (
            <DirectoryOption key={name} dirName={name} dirFilePath={dirPath} currentDirectory={selectedDirectory} updateCurrentDirectory={updateSelectedDirectory} />
          ))}
        </div>
      </div>
    </div>
  );
}
