import { Button } from '@renderer/components/ui/button';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@renderer/components/ui/drawer';
import type { ChangeLogEntry } from '@renderer/lib/types';

interface ChangeLogDrawerProps {
  isDrawerOpen: boolean;
  triggerChangeLog: () => void;
  changeLog: ChangeLogEntry[];
  undoChangeLogAction: (actionObj: ChangeLogEntry) => Promise<void>;
}

export default function ChangeLogDrawer({ isDrawerOpen, triggerChangeLog, changeLog, undoChangeLogAction }: ChangeLogDrawerProps): React.JSX.Element {
  const renderChangeEntry = (change: ChangeLogEntry): React.JSX.Element => {
    switch (change.actionType) {
      case 'sort': {
        return (
          <>
            <h1>File Transfer:</h1>
            <p>
              File {change.actionDetails.itemName} was moved to {change.actionDetails.itemPath}
            </p>
            <Button onClick={() => undoChangeLogAction(change)}>Undo</Button>
          </>
        );
        break;
      }
      case 'create': {
        return (
          <>
            <h1>New Folder:</h1>
            <p>New Folder {change.actionDetails.itemName} was created.</p>
            <Button onClick={() => undoChangeLogAction(change)}>Undo</Button>
          </>
        );
        break;
      }
      case 'undoCreate': {
        return (
          <>
            <h1>Undo {change.successful === true ? 'Successful' : 'Failed'}:</h1>
            <p>Remove directory {change.actionDetails.itemPath}!</p>
          </>
        );
        break;
      }
      case 'undoSort': {
        return (
          <>
            <h1>Undo {change.successful === true ? 'Successful' : 'Failed'}:</h1>
            <p>
              Remove file {change.actionDetails.itemName} from {change.actionDetails.itemPath}!
            </p>
          </>
        );
        break;
      }
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={triggerChangeLog}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>ChangeLog</DrawerTitle>
        </DrawerHeader>
        <div>
          {changeLog.map((change) => (
            <div key={change.id} className="flex flex-row">
              {renderChangeEntry(change)}
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
