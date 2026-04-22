import { Button } from '@renderer/components/ui/button';
import FlexRowContainer from '@renderer/components/ui/flex-row-container';
import { ChangeLogEntry } from '@renderer/lib/types';

interface LogEntryProps {
  change: ChangeLogEntry;
  undoChangeLogAction: (actionObj: ChangeLogEntry) => Promise<void>;
}

export default function LogEntry({ change, undoChangeLogAction }: LogEntryProps): React.JSX.Element {
  let changeTitle = '';
  let changeDescription = '';

  switch (change.actionType) {
    case 'sort': {
      changeTitle = 'FileTransfer:';
      changeDescription = `File ${change.actionDetails.itemName} was moved to ${change.actionDetails.itemPath}`;
      break;
    }
    case 'create': {
      changeTitle = 'New Folder:';
      changeDescription = `New Folder ${change.actionDetails.itemName} was created.`;
      break;
    }
    case 'undoCreate': {
      changeTitle = `Undo ${change.successful === true ? 'Successful' : 'Failed'}:`;
      changeDescription = `Remove directory ${change.actionDetails.itemPath}!`;
      break;
    }
    case 'undoSort': {
      changeTitle = `Undo ${change.successful === true ? 'Successful' : 'Failed'}:`;
      changeDescription = `Remove file ${change.actionDetails.itemName} from ${change.actionDetails.itemPath}!`;
      break;
    }
  }

  return (
    <FlexRowContainer className="flex flex-row w-full h-1/6 items-center p-0">
      <h1 className="w-1/6 xl:w-1/12 h-full border border-foreground p-1.5">{changeTitle}</h1>
      <p className="w-4/6 xl:w-10/12 h-full border border-foreground p-1.5 truncate">{changeDescription}</p>
      {change.actionType === 'sort' || change.actionType === 'create' ? (
        <Button onClick={() => undoChangeLogAction(change)} className="w-1/6 xl:w-1/12 h-full border border-foreground rounded-none hover:bg-secondary/50 hover:text-accent">
          ^
        </Button>
      ) : (
        <Button className="w-1/6 xl:w-1/12 h-full border border-foreground rounded-none hover:bg-secondary/50 hover:text-accent" disabled>
          ^
        </Button>
      )}
    </FlexRowContainer>
  );
}
