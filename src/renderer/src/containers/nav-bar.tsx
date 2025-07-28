import type { JSX } from 'react';

interface NavBarProps {
  children?: React.ReactNode;
}

export default function NavBar({ children }: NavBarProps): JSX.Element {
  return (
    <header className="flex flex-row justify-between bg-blue-700">
      <h1 className="text-3xl">Invoice Manager</h1>
      {children}
    </header>
  );
}
