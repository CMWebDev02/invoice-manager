import { ViewerActions } from '@renderer/lib/file-system';

interface ViewerContainerProps {
  viewerActions: ViewerActions;
}

export default function ViewerContainer({ viewerActions }: ViewerContainerProps): React.JSX.Element {
  return (
    <>
      <h1>Temp</h1>
    </>
  );
}
