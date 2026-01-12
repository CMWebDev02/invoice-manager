import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@renderer/components/ui/drawer';

interface ChangeLogDrawerProps {
  isDrawerOpen: boolean;
  triggerChangeLog: () => void;
}

export default function ChangeLogDrawer({ isDrawerOpen, triggerChangeLog }: ChangeLogDrawerProps): React.JSX.Element {
  return (
    <Drawer open={isDrawerOpen} onOpenChange={triggerChangeLog}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>ChangeLog</DrawerTitle>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
