import { FileSystem, ViewerActions } from '@renderer/lib/file-system';
import { toast, Toaster } from 'sonner';
import ViewersNavBar from '../components/viewers-navbar';
import DirectorySelector from './directory-selector';
import { useState } from 'react';
import useFetchData from '@renderer/hooks/useFetchData';
import { DirectoryContent, DirectoryExport } from '@renderer/lib/types';
import DirectoryNavigation from './directory-navigation';
import InvoiceDisplay from '@renderer/components/user/invoice-display';

interface ViewerContainerProps {
  viewerActions: ViewerActions;
}

export default function ViewerContainer({ viewerActions }: ViewerContainerProps): React.JSX.Element {
  const [isUserInteractionDisabled, setIsUserInteractionDisabled] = useState<boolean>(false);
  const [selectedDirectoryPath, setSelectedDirectoryPath] = useState<string | null>(null);
  const [selectedInvoiceData, setSelectedInvoiceData] = useState<string | null>(null);

  const { fetchData: directoriesArrays, error: directoriesError, isLoading: areDirectoriesLoading, triggerRefetching: refetchDirectories } = useFetchData<DirectoryExport[][]>({ asyncFunction: viewerActions.getSubDirectories.bind(viewerActions), asyncFunctionKey: 'viewer-directories' });

  async function getDirectoryContents(dirPath: string): Promise<DirectoryContent[] | null> {
    const dirContents = await viewerActions.getAllDirContents(dirPath);
    return dirContents;
  }

  async function getInvoice(path: DirectoryContent): Promise<void> {
    try {
      const invoiceFile = await viewerActions.getInvoice(path);
      if (invoiceFile === null) throw new Error('Failed to Retrieve Invoice!');
      console.log('Test');
      setSelectedInvoiceData(invoiceFile.data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An Unknown Error Has Occurred!');
      }
    }
  }

  function updateSelectedDirectory(dirObj: DirectoryExport): void {
    setSelectedDirectoryPath(dirObj.dirPath);
  }

  function returnToSearch(): void {
    setSelectedDirectoryPath(null);
    setSelectedInvoiceData(null);
  }

  if (areDirectoriesLoading) {
    return <h1>Loading...</h1>;
  }

  if (directoriesError || directoriesArrays === undefined) {
    return (
      <h1>
        <p>Error Occurred: </p>
        <p>{directoriesError?.message}</p>
      </h1>
    );
  }

  return (
    <>
      <ViewersNavBar sorterTitle={viewerActions.sorterTitle} />
      <main className="h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-y-auto w-screen bg-background">
        <div className="w-full h-full flex flex-row p-2">
          {/* Have this get hidden for a directory navigation element upon user clicking select */}
          <div className="w-1/3 h-full flex flex-col gap-1">{selectedDirectoryPath === null ? <DirectorySelector disabled={isUserInteractionDisabled} directoriesArrays={directoriesArrays} updateSelectedDirectory={updateSelectedDirectory} /> : <DirectoryNavigation mainDirPath={selectedDirectoryPath} returnToSearch={returnToSearch} getDirectoryContents={getDirectoryContents} getInvoice={getInvoice} />}</div>
          {selectedInvoiceData !== null && <InvoiceDisplay disabled={isUserInteractionDisabled} invoiceFileData={selectedInvoiceData} />}
        </div>
      </main>
      <Toaster />
    </>
  );
}
