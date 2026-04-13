import { Outlet } from 'react-router';
import NavBar from '../user/nav-bar';

export default function HeaderAndBody(): React.JSX.Element {
  return (
    <>
      <NavBar>
        <h1 className="text-3xl select-none">Invoice Manager</h1>
      </NavBar>
      <main className="h-[calc(100vh-3rem)] w-screen bg-background">
        <Outlet />
      </main>
    </>
  );
}
