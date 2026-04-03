import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@renderer/components/ui/drawer';
import type { ChangeLogEntry } from '@renderer/lib/types';
import LogEntry from './changelog-entry';

interface ChangeLogDrawerProps {
  isDrawerOpen: boolean;
  triggerChangeLog: () => void;
  changeLog: ChangeLogEntry[];
  undoChangeLogAction: (actionObj: ChangeLogEntry) => Promise<void>;
}

export default function ChangeLogDrawer({ isDrawerOpen, triggerChangeLog, changeLog, undoChangeLogAction }: ChangeLogDrawerProps): React.JSX.Element {
  return (
    <Drawer open={isDrawerOpen} onOpenChange={triggerChangeLog}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>ChangeLog</DrawerTitle>
        </DrawerHeader>
        <div className="w-full h-full flex flex-col border-2 border-foreground">
          {changeLog.map((change) => (
            <LogEntry key={change.id} change={change} undoChangeLogAction={undoChangeLogAction} />
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
