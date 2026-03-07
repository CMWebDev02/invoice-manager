import { ViewerActions } from '@renderer/lib/file-system';
import { Toaster } from 'sonner';
import ViewersNavBar from '../components/viewers-navbar';
import DirectorySelector from './directory-selector';
import { useState } from 'react';
import useFetchData from '@renderer/hooks/useFetchData';
import { DirectoryExport } from '@renderer/lib/types';

interface ViewerContainerProps {
  viewerActions: ViewerActions;
}

export default function ViewerContainer({ viewerActions }: ViewerContainerProps): React.JSX.Element {
  const [isUserInteractionDisabled, setIsUserInteractionDisabled] = useState<boolean>(false);
  const [selectedDirectory, setSelectedDirectory] = useState<DirectoryExport | null>(null);

  const { fetchData: directoriesArrays, error: directoriesError, isLoading: areDirectoriesLoading, triggerRefetching: refetchDirectories } = useFetchData<DirectoryExport[][]>({ asyncFunction: viewerActions.getSubDirectories.bind(viewerActions), asyncFunctionKey: 'viewer-directories' });

  function updateSelectedDirectory(dirObj: DirectoryExport): void {
    setSelectedDirectory(dirObj);
  }

  return (
    <>
      <ViewersNavBar sorterTitle={viewerActions.sorterTitle} />
      <main className="h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-y-auto w-screen bg-background">
        <div className="w-full h-full flex flex-row p-2">
          {/* Have this get hidden for a directory navigation element upon user clicking select */}
          <div className="w-1/3 h-full flex flex-col gap-1">{directoriesArrays !== null && directoriesArrays !== undefined && <DirectorySelector disabled={isUserInteractionDisabled} directoriesArrays={directoriesArrays} selectedDirectory={selectedDirectory} updateSelectedDirectory={updateSelectedDirectory} />}</div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
