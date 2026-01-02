import { Outlet } from 'react-router';
import NavBar from '../user/nav-bar';

export default function HeaderAndBody(): React.JSX.Element {
  return (
    <>
      <NavBar />
      <main className="h-[calc(100vh-2.5rem)] w-screen bg-background">
        <Outlet />
      </main>
    </>
  );
}
