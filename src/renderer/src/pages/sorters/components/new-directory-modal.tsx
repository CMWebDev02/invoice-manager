import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@renderer/components/ui/sheet';
import WhiteListInput from '@renderer/components/user/white-list-input';
import { titleCharactersWhiteList } from '@renderer/lib/patterns';

interface NewDirectoryModalProps {
  isOpen: boolean;
  changeOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function NewDirectoryModal({ isOpen, changeOpen }: NewDirectoryModalProps): React.JSX.Element {
  return (
    <Sheet open={isOpen} onOpenChange={changeOpen}>
      <SheetContent className="w-1/3" side="left">
        <SheetHeader>
          <SheetTitle>New Directory Creator</SheetTitle>
        </SheetHeader>
        <WhiteListInput regexWhiteList={titleCharactersWhiteList} />
      </SheetContent>
    </Sheet>
  );
}
