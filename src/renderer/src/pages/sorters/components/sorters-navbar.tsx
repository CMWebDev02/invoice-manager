import { Button } from '@renderer/components/ui/button';

interface SortersNavBarProps {
  sorterTitle: string;
  triggerSorting: () => void;
  triggerModal: () => void;
}

export default function SortersNavBar({ sorterTitle, triggerSorting, triggerModal }: SortersNavBarProps): React.JSX.Element {
  return (
    <nav className="flex flex-row justify-between bg-navbar px-2 py-1 text-title h-12">
      <h1 className="text-3xl select-none">{sorterTitle}</h1>

      <div className="flex flex-row justify-around w-1/3">
        <Button onClick={triggerSorting}>Sort</Button>
        <Button onClick={triggerModal}>New Folder</Button>
        <Button>Menu</Button>
      </div>
    </nav>
  );
}
