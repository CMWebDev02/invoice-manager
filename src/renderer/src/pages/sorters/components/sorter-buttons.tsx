import { Button } from '@renderer/components/ui/button';

interface SorterButtonsProps {
  triggerSorting: () => void;
  triggerModal: () => void;
  triggerChangeLog: () => void;
}

export default function SorterButtons({ triggerSorting, triggerModal, triggerChangeLog }: SorterButtonsProps): React.JSX.Element {
  return (
    <div className="w-full flex flex-wrap">
      <Button onClick={triggerSorting} variant={'action'} className="w-1/2 lg:w-1/3">
        Sort
      </Button>
      <Button onClick={triggerModal} variant={'action'} className="w-1/2 lg:w-1/3">
        New Folder
      </Button>
      <Button onClick={triggerChangeLog} variant={'action'} className="w-full lg:w-1/3">
        Changelog
      </Button>
    </div>
  );
}
