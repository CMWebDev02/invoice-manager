import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@renderer/components/ui/drawer';
import type { ChangeLogEntry } from '@renderer/lib/types';

interface ChangeLogDrawerProps {
  isDrawerOpen: boolean;
  triggerChangeLog: () => void;
  changeLog: ChangeLogEntry[];
}

export default function ChangeLogDrawer({ isDrawerOpen, triggerChangeLog, changeLog }: ChangeLogDrawerProps): React.JSX.Element {
  return (
    <Drawer open={isDrawerOpen} onOpenChange={triggerChangeLog}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>ChangeLog</DrawerTitle>
        </DrawerHeader>
        <div>
          {changeLog.map((change) => (
            <div key={change.id} className="flex flex-row">
              {change.actionType === 'creating' ? (
                <>
                  <h1>New Folder:</h1>
                  <p>New Folder {change.actionDetails.itemName} was created.</p>
                </>
              ) : (
                <>
                  <h1>File Transfer:</h1>
                  <p>
                    File {change.actionDetails.itemName} was moved to {change.actionDetails.itemPath}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
