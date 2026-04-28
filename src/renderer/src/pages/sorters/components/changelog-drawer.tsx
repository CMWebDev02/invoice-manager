import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@renderer/components/ui/drawer';
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

//? For testing purposes - Fills changelog with example info
// const changeLogEntry: ChangeLogEntry = { actionDetails: { itemName: 'asdfsadf', itemPath: 'ADFASDFASDF' }, id: '1', successful: true, actionType: 'undoCreate' };
// const testChangeLogs: ChangeLogEntry[] = [];
// for (let i = 0; i <= 40; i++) {
//   const entry = { ...changeLogEntry, id: `${i}` };
//   testChangeLogs.push(entry);
// }

export default function ChangeLogDrawer({ isDrawerOpen, triggerChangeLog, changeLog, undoChangeLogAction }: ChangeLogDrawerProps): React.JSX.Element {
  return (
    <Drawer open={isDrawerOpen} onOpenChange={triggerChangeLog}>
      <DrawerContent className="w-full h-full" aria-describedby="Drawer for displaying the changelog for the sorter.">
        <FlexColContainer className="w-full h-12">
          <DrawerHeader>
            <DrawerTitle className="text-xl">ChangeLog</DrawerTitle>
          </DrawerHeader>
        </FlexColContainer>
        <FlexColContainer className="w-full h-[calc(100%-3rem)] max-h-[calc(100%-3rem)] overflow-x-hidden overflow-y-scroll border-2 border-foreground">
          <FlexRowContainer className="w-full h-9 items-center justify-between p-0">
            <p className="w-1/6 xl:w-1/12 h-full border border-foreground p-1 truncate">Past Action</p>
            <p className="w-4/6 xl:w-10/12 h-full border border-foreground p-1 truncate">Action Description</p>
            <p className="w-1/6 xl:w-1/12 h-full border border-foreground p-1 rounded-none truncate">Undo Button</p>
          </FlexRowContainer>
          {changeLog.map((change) => (
            <LogEntry key={change.id} change={change} undoChangeLogAction={undoChangeLogAction} />
          ))}
          {/* {testChangeLogs.map((change) => (
            <LogEntry key={change.id} change={change} undoChangeLogAction={undoChangeLogAction} />
          ))} */}
        </FlexColContainer>
      </DrawerContent>
    </Drawer>
  );
}
