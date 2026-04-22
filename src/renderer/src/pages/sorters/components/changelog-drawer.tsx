import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from '@renderer/components/ui/drawer';
import type { ChangeLogEntry } from '@renderer/lib/types';
import LogEntry from './log-entry';
import FlexColContainer from '@renderer/components/ui/flex-col-container';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';

interface ChangeLogDrawerProps {
  isDrawerOpen: boolean;
  triggerChangeLog: () => void;
  changeLog: ChangeLogEntry[];
  undoChangeLogAction: (actionObj: ChangeLogEntry) => Promise<void>;
}

export default function ChangeLogDrawer({ isDrawerOpen, triggerChangeLog, changeLog, undoChangeLogAction }: ChangeLogDrawerProps): React.JSX.Element {
  return (
    <Drawer open={isDrawerOpen} onOpenChange={triggerChangeLog}>
      <DrawerContent aria-describedby="Drawer for displaying the changelog for the sorter.">
        <FlexColContainer>
          <DrawerHeader>
            <DrawerTitle>ChangeLog</DrawerTitle>
          </DrawerHeader>
        </FlexColContainer>
        <FlexColContainer className="w-full h-full border-2 border-foreground">
          <DrawerDescription>
            <FlexRowContainer className="w-full h-1/6 items-center justify-between p-0">
              <h1 className="w-1/6 xl:w-1/12 h-full border border-foreground p-1">Past Action</h1>
              <p className="w-4/6 xl:w-10/12 h-full border border-foreground p-1 truncate">Action Description</p>
              <p className="w-1/6 xl:w-1/12 h-full border border-foreground p-1 rounded-none">Undo Button</p>
            </FlexRowContainer>
          </DrawerDescription>
          {changeLog.map((change) => (
            <LogEntry key={change.id} change={change} undoChangeLogAction={undoChangeLogAction} />
          ))}
        </FlexColContainer>
      </DrawerContent>
    </Drawer>
  );
}
