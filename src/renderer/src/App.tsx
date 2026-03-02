import { BrowserRouter, Route, Routes } from 'react-router';
import './styles/styles.css';
import TitlePage from './pages/title-page/title-page';
import SettingsPage from './pages/settings/settings-page';
import ChangeLogsPage from './pages/changelogs/changelogs-pages';
import SelectorsPage from './pages/selectors/selectors-page';
import { useEffect, useState } from 'react';
import SortersPage from './pages/sorters/sorters-page';
import HeaderAndBody from './components/pages/header-and-body';

export default function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function pullUserDrives(): Promise<void> {
      await window.api.storage.storeUserDrives();
      setIsLoading(false);
    }

    pullUserDrives();
  }, []);

  // Add an actual loading screen
  if (isLoading) return <h1>Loading</h1>;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<HeaderAndBody />}>
            <Route index element={<TitlePage />} />
            <Route path="/selector-viewers" element={<SelectorsPage selectorType="viewers" />} />
            <Route path="/selector-sorters" element={<SelectorsPage selectorType="sorters" />} />
            {/* Will Add Changelogs Saving in the Future */}
            {/* <Route path="/changelogs" element={<ChangeLogsPage />} /> */}
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="/sorters/:sorterId" element={<SortersPage />} />
          {/* <Route path="/viewers/:sorterId" element={<SortersPage />} /> Add once viewers page is initialized*/}
        </Routes>
      </BrowserRouter>
    </>
  );
}
