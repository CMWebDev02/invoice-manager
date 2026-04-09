import MenuButton from '@renderer/components/user/menu-button';

interface ViewersNavBarProps {
  viewerTitle: string;
}

export default function ViewersNavBar({ viewerTitle }: ViewersNavBarProps): React.JSX.Element {
  return (
    <nav className="flex flex-row justify-between bg-navbar px-2 py-1 text-title h-12">
      <h1 className="text-3xl select-none">Viewer - {viewerTitle}</h1>

      <div className="flex flex-row justify-end w-1/3">
        <MenuButton />
      </div>
    </nav>
  );
}
