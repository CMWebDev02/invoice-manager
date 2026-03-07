import { ViewerActions } from '@renderer/lib/file-system';
import { Toaster } from 'sonner';
import ViewersNavBar from '../components/viewers-navbar';

interface ViewerContainerProps {
  viewerActions: ViewerActions;
}

export default function ViewerContainer({ viewerActions }: ViewerContainerProps): React.JSX.Element {
  return (
    <>
      <ViewersNavBar sorterTitle={viewerActions.sorterTitle} />
      <main className="h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-y-auto w-screen bg-background">
        <div className="w-full h-full flex flex-row p-2">
          <div className="w-1/3 h-full flex flex-col gap-1"></div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
