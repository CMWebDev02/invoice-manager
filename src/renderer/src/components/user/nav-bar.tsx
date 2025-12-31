interface NavBarProps {
  displayElements: React.JSX.Element;
}

export default function NavBar({ displayElements }: NavBarProps): React.JSX.Element {
  return (
    <header className="flex flex-row justify-between bg-navbar px-2 pb-1 text-title">
      <h1 className="text-3xl select-none">Invoice Manager</h1>
      {displayElements}
    </header>
  );
}
