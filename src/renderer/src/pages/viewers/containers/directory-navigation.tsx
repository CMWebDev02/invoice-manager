import useAsyncUpdate from '@renderer/hooks/useAsyncUpdate';
import { FileSystem } from '@renderer/lib/file-system';
import { useEffect, useState } from 'react';
import DirectoryList from '../components/directory-list';
import { toast } from 'sonner';
import { Button } from '@renderer/components/ui/button';
import { DirectoryContent } from '@renderer/lib/types';
import LoadingIndicator from '@renderer/components/pages/loading-indicator';
import ErrorPage from '@renderer/components/pages/error-page';
import FlexColContainer from '@renderer/components/ui/flex-col-container';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';
import WhiteListInput from '@renderer/components/user/white-list-input';
import { titleCharactersBlackList } from '@renderer/lib/patterns';
import useDebounce from '@renderer/hooks/useDebounce';

interface DirectoryNavigationProps {
  mainDirPath: string;
  returnToSearch: () => void;
  getDirectoryContents: (dirContents: string) => Promise<DirectoryContent[] | null>;
  getInvoice: (path: DirectoryContent) => Promise<void>;
  disabled: boolean;
  autoSelectText: boolean;
  useStrictInputs: boolean;
}

export default function DirectoryNavigation({ mainDirPath, returnToSearch, getDirectoryContents, getInvoice, disabled, autoSelectText, useStrictInputs }: DirectoryNavigationProps): React.JSX.Element {
  const [currentDirPath, setCurrentDirPath] = useState<string>(mainDirPath);
  const [userSearchString, setUserSearchString] = useState<string>('');
  const [filteredSubDirs, setFilteredSubDirs] = useState<DirectoryContent[]>([]);
  const filterString = useDebounce({ updateVar: userSearchString });

  const { updateResults: currentDirSubDirs, error: subDirsError, isLoading: areSubDirsLoaded } = useAsyncUpdate({ asyncFunction: getDirectoryContents, updateTrigger: currentDirPath });

  useEffect(() => {
    function reFilter(): void {
      const textInput = filterString;

      // Checks that the textInput is populated
      if (textInput !== '' && currentDirSubDirs !== null) {
        const filteredArray = currentDirSubDirs.filter((directory) => {
          // Performs the necessary check of the directory name based on the user's capitalization setting,
          const directoryName = !useStrictInputs ? directory.name : directory.name.toUpperCase();
          const comparedTextInput = !useStrictInputs ? textInput : textInput.toUpperCase();

          return directoryName.startsWith(comparedTextInput);
        });
        setFilteredSubDirs(filteredArray);
      } else if (currentDirSubDirs !== null) {
        // If no text is present and the sub dirs are loaded fill the array with the current sub dirs
        setFilteredSubDirs(currentDirSubDirs);
      } else {
        // Else set to an empty array
        setFilteredSubDirs([]);
      }
    }

    reFilter();
  }, [currentDirSubDirs, filterString, useStrictInputs]);

  // Traverses to the parent path of the current directory using relative paths.
  function reversePathTraversal(): void {
    // Prevents the user from traversing beyond the initial parent directory
    if (currentDirPath !== mainDirPath) {
      const previousRelativePath = FileSystem.joinPaths(currentDirPath, '..');
      setCurrentDirPath(previousRelativePath);
    } else {
      toast.error('Cannot Go Beyond Parent Directory!');
    }
  }

  function updateSearchString(e: React.ChangeEvent<HTMLInputElement>): void {
    const textInput = e.target.value;
    setUserSearchString(textInput);
  }

  // Selects all text in the text box upon entering it
  function selectAllText(e: React.SyntheticEvent<HTMLInputElement, Event>): void {
    if (autoSelectText) {
      e.currentTarget.select();
    }
  }

  if (subDirsError) {
    return <ErrorPage errors={[subDirsError]} />;
  }

  if (areSubDirsLoaded) {
    return <LoadingIndicator />;
  }

  return (
    <FlexColContainer className="w-full h-full justify-between gap-1">
      <FlexRowContainer className="w-full p-1 justify-around items-center h-12 gap-1">
        <label htmlFor="search-filter" className="w-auto select-none text-foreground">
          Search:
        </label>
        <WhiteListInput className="w-full rounded-none bg-secondary text-foreground border border-foreground" disabled={disabled} regexBlackList={titleCharactersBlackList} placeholder="Search..." id="search-filter" onChange={(e) => updateSearchString(e)} value={userSearchString} onFocus={(e) => selectAllText(e)} />
      </FlexRowContainer>

      <FlexColContainer className="w-full h-[calc(100%-5.75rem)]">
        <Button className="w-full bg-primary hover:text-accent h-10" variant={'action'} onClick={reversePathTraversal}>
          ...
        </Button>
        <div className="w-full h-[calc(100%-2.5rem)] overflow-y-auto border border-foreground bg-secondary">{<DirectoryList subDirs={filteredSubDirs} updateCurrentPath={setCurrentDirPath} getInvoice={getInvoice} disabled={disabled} />}</div>
      </FlexColContainer>
      <Button onClick={returnToSearch} disabled={disabled} variant={'action'} className="h-8">
        Return
      </Button>
    </FlexColContainer>
  );
}
