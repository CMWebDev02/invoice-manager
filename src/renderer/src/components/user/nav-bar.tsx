export default function NavBar(): React.JSX.Element {
  //TODO: Create a single nav bar and have it display any passed in children
  return (
    <header className="flex flex-row justify-between bg-navbar px-2 pb-1 text-title">
      <h1 className="text-3xl select-none">Invoice Manager</h1>
    </header>
  );
}
