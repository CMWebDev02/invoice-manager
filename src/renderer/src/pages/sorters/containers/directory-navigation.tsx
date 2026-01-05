import type { Dirent } from 'fs';
import YearSelector from '../components/year-selector';
import { useState } from 'react';
import WhiteListInput from '@renderer/components/user/white-list-input';
import { Button } from '@renderer/components/ui/button';
import { titleCharactersWhiteList } from '@renderer/lib/patterns';
import { userSettings } from '@renderer/lib/temp';

interface DirectoryNavigationProps {
  directoriesArrays: Dirent<string>[][];
}

export default function DirectoryNavigation({ directoriesArrays }: DirectoryNavigationProps): React.JSX.Element {
  const [userSearchString, setUserSearchString] = useState<string>('');
  const [filteredDirectories, setFilteredDirectories] = useState<Dirent<string>[]>([]);

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
    setUserSearchString(e.target.value);
  }

  return (
    <div className="w-1/3">
      <div className="flex flex-row p-1 justify-around items-center w-full h-12">
        <WhiteListInput regexWhiteList={titleCharactersWhiteList} placeholder="Search..." onChange={(e) => filterDirectories(e)} value={userSearchString} />
        <YearSelector />
      </div>
      <div className="flex flex-col w-full h-[calc(100%-3rem)] overflow-y-scroll bg-secondary">
        <div className="w-full">
          {filteredDirectories.map((dir) => (
            <h1 key={dir.name}>{dir.name}</h1>
          ))}
          {/* <Button className="w-5/6">Directory</Button> */}
          {/* <Button className="w-1/6">-{'>'}</Button> */}
        </div>
      </div>
    </div>
  );
}
