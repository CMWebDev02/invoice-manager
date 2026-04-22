interface NavBarProps {
  children: React.ReactNode;
}

export default function NavBar({ children }: NavBarProps): React.JSX.Element {
  return <header className="flex flex-row justify-between bg-navbar px-2 py-1 h-12 text-title">{children}</header>;
}
