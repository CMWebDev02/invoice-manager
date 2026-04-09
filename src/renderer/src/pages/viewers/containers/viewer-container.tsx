import { ViewerActions } from '@renderer/lib/file-system';
import { toast, Toaster } from 'sonner';
import ViewersNavBar from '../components/viewers-navbar';
import DirectorySelector from './directory-selector';
import { useEffect, useState } from 'react';
import useFetchData from '@renderer/hooks/useFetchData';
import { DirectoryContent, DirectoryExport } from '@renderer/lib/types';
import DirectoryNavigation from './directory-navigation';
import InvoiceDisplay from '@renderer/components/user/invoice-display';
import LoadingPage from '@renderer/pages/loading/loading-page';
import ErrorPage from '@renderer/components/pages/error-page';

interface ViewerContainerProps {
  viewerActions: ViewerActions;
}

export default function ViewerContainer({ viewerActions }: ViewerContainerProps): React.JSX.Element {
  const [isUserInteractionDisabled, setIsUserInteractionDisabled] = useState<boolean>(true);
  const [selectedDirectoryPath, setSelectedDirectoryPath] = useState<string | null>(null);
  const [selectedInvoiceData, setSelectedInvoiceData] = useState<string | null>(null);

  const { fetchData: directoriesArrays, error: directoriesError, isLoading: areDirectoriesLoading } = useFetchData<DirectoryExport[][]>({ asyncFunction: viewerActions.getSubDirectories.bind(viewerActions), asyncFunctionKey: 'viewer-directories' });

  useEffect(() => {
    if (directoriesArrays !== null && directoriesArrays !== undefined) {
      setIsUserInteractionDisabled(false);
    }
  }, [directoriesArrays]);

  async function getDirectoryContents(dirPath: string): Promise<DirectoryContent[] | null> {
    try {
      setIsUserInteractionDisabled(true);
      const dirContents = await viewerActions.getAllDirContents(dirPath);
      return dirContents;
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An Unknown Error Has Occurred!');
      }

      return null;
    } finally {
      setIsUserInteractionDisabled(false);
    }
  }

  async function getInvoice(path: DirectoryContent): Promise<void> {
    try {
      setIsUserInteractionDisabled(true);
      const invoiceFile = await viewerActions.getInvoice(path);
      if (invoiceFile === null) throw new Error('Failed to Retrieve Invoice!');
      setSelectedInvoiceData(invoiceFile.data);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An Unknown Error Has Occurred!');
      }
    } finally {
      setIsUserInteractionDisabled(false);
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
    return <LoadingPage />;
  }

  if (directoriesError || directoriesArrays === undefined) {
    const errors: Error[] = [];
    if (directoriesError !== null) errors.push(directoriesError);
    if (directoriesArrays === undefined) errors.push(new Error('Failed to Fetch Directories!'));
    return <ErrorPage errors={errors} />;
  }

  return (
    <>
      <ViewersNavBar viewerTitle={viewerActions.sorterTitle} />
      <main className="h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-y-auto w-screen bg-background">
        <div className="w-full h-full flex flex-row p-2">
          {/* Shows the selected directory contents or the directory navigation list */}
          <div className="w-1/3 h-full flex flex-col gap-1">{selectedDirectoryPath === null ? <DirectorySelector disabled={isUserInteractionDisabled} directoriesArrays={directoriesArrays} updateSelectedDirectory={updateSelectedDirectory} /> : <DirectoryNavigation mainDirPath={selectedDirectoryPath} returnToSearch={returnToSearch} getDirectoryContents={getDirectoryContents} getInvoice={getInvoice} disabled={isUserInteractionDisabled} />}</div>
          {selectedInvoiceData !== null && <InvoiceDisplay disabled={isUserInteractionDisabled} invoiceFileData={selectedInvoiceData} />}
        </div>
      </main>
      <Toaster />
    </>
  );
}
