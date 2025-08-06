import { BrowserRouter, Route, Routes } from 'react-router';
import './styles/styles.css';
import TitlePage from './pages/title-page/title-page';
import NavBar from './components/user/nav-bar';
import SettingsPage from './pages/settings/settings-page';
import ChangeLogsPage from './pages/changelogs/changelogs-pages';
import SelectorsPage from './pages/selectors/selectors-page';
import { useEffect, useState } from 'react';

export default function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function pullUserDrives(): Promise<void> {
      await window.api.initialization.storeUserDrives();
      setIsLoading(false);
    }

    pullUserDrives();
  }, []);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <>
      <NavBar />
      <main className="h-[calc(100vh-2.5rem)] w-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TitlePage />} />
            <Route path="/viewers" element={<SelectorsPage selectorType="viewers" />} />
            <Route path="/sorters" element={<SelectorsPage selectorType="sorters" />} />
            <Route path="/changelogs" element={<ChangeLogsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}
