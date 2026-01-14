import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@renderer/components/ui/drawer';
import type { ChangeLogEntry } from '@renderer/lib/types';
import { FileArchiveIcon, FolderArchiveIcon } from 'lucide-react';

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
            <div key={change.id}>{change.actionType === 'creating' ? <h1>Folder</h1> : <h1>Folder</h1>}</div>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
