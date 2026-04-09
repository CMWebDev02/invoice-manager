import MenuButton from '../../../components/user/menu-button';

interface SortersNavBarProps {
  sorterTitle: string;
}

export default function SortersNavBar({ sorterTitle }: SortersNavBarProps): React.JSX.Element {
  //TODO: Create a single nav bar and have it display any passed in children
  return (
    <nav className="flex flex-row justify-between bg-navbar px-2 py-1 text-title h-12 items-center">
      <h1 className="text-3xl select-none">Sorter - {sorterTitle}</h1>
      <MenuButton />
    </nav>
  );
}
