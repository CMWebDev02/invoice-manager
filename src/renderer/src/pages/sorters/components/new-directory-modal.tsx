import { Label } from '@radix-ui/react-label';
import { Button } from '@renderer/components/ui/button';
import { ButtonGroup } from '@renderer/components/ui/button-group';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@renderer/components/ui/sheet';
import WhiteListInput from '@renderer/components/user/white-list-input';
import { titleCharactersWhiteList } from '@renderer/lib/patterns';

interface NewDirectoryModalProps {
  isOpen: boolean;
  changeOpen: React.Dispatch<React.SetStateAction<boolean>>;
  createNewDirectory: () => Promise<void>;
  newDirectoryName: string;
  setNewDirectoryName: React.Dispatch<React.SetStateAction<string>>;
}

export default function NewDirectoryModal({ isOpen, changeOpen, createNewDirectory, newDirectoryName, setNewDirectoryName }: NewDirectoryModalProps): React.JSX.Element {
  return (
    <Sheet open={isOpen} onOpenChange={changeOpen}>
      <SheetContent className="w-1/3 p-1" side="left">
        <SheetHeader aria-describedby="Modal for initializing a new directory.">
          <SheetTitle>Directory Initializer</SheetTitle>
        </SheetHeader>
        <Label htmlFor="newDirectoryTextBox">New Directory Name:</Label>
        <WhiteListInput id="newDirectoryTextBox" regexWhiteList={titleCharactersWhiteList} value={newDirectoryName} onChange={(e) => setNewDirectoryName(e.target.value)} className="rounded-none bg-secondary text-foreground border border-foreground" />
        <ButtonGroup orientation={'vertical'} className="w-full">
          <Button onClick={createNewDirectory} variant={'action'}>
            Create
          </Button>
          <Button onClick={() => changeOpen(false)} variant={'action'}>
            Cancel
          </Button>
        </ButtonGroup>
      </SheetContent>
    </Sheet>
  );
}
