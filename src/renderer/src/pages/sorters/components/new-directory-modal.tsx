import { Label } from '@radix-ui/react-label';
import { Button } from '@renderer/components/ui/button';
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
      <SheetContent className="w-1/3" side="left">
        <SheetHeader aria-describedby="Modal for initializing a new directory.">
          <SheetTitle>Directory Initializer</SheetTitle>
        </SheetHeader>
        <Label htmlFor="newDirectoryTextBox">New Directory Name:</Label>
        <WhiteListInput id="newDirectoryTextBox" regexWhiteList={titleCharactersWhiteList} value={newDirectoryName} onChange={(e) => setNewDirectoryName(e.target.value)} />
        <Button onClick={createNewDirectory}>Create</Button>
        <Button onClick={() => changeOpen(false)}>Cancel</Button>
      </SheetContent>
    </Sheet>
  );
}
