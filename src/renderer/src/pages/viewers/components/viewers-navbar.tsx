import MenuButton from '@renderer/pages/selectors/components/menu-button';

interface ViewersNavBarProps {
  sorterTitle: string;
}

export default function ViewersNavBar({ sorterTitle }: ViewersNavBarProps): React.JSX.Element {
  return (
    <nav className="flex flex-row justify-between bg-navbar px-2 py-1 text-title h-12">
      <h1 className="text-3xl select-none">{sorterTitle}</h1>

      <div className="flex flex-row justify-end w-1/3">
        <MenuButton />
      </div>
    </nav>
  );
}
