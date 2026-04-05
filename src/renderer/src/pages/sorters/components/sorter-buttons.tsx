import { Button } from '@renderer/components/ui/button';
import { ButtonGroup, ButtonGroupSeparator } from '@renderer/components/ui/button-group';

interface SorterButtonsProps {
  triggerSorting: () => void;
  triggerModal: () => void;
  triggerChangeLog: () => void;
}

export default function SorterButtons({ triggerSorting, triggerModal, triggerChangeLog }: SorterButtonsProps): React.JSX.Element {
  return (
    <ButtonGroup>
      <Button onClick={triggerSorting} variant={'action'}>
        Sort
      </Button>
      <ButtonGroupSeparator className="bg-foreground" />
      <Button onClick={triggerModal} variant={'action'}>
        New Folder
      </Button>
      <ButtonGroupSeparator className="bg-foreground" />
      <Button onClick={triggerChangeLog} variant={'action'}>
        Changelog
      </Button>
    </ButtonGroup>
  );
}
