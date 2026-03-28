import { BrowserRouter, Route, Routes } from 'react-router';
import './styles/styles.css';
import TitlePage from './pages/title-page/title-page';
import SettingsPage from './pages/settings/settings-page';
import ChangeLogsPage from './pages/changelogs/changelogs-pages';
import SelectorsPage from './pages/selectors/selectors-page';
import { useEffect, useState } from 'react';
import SortersPage from './pages/sorters/sorters-page';
import HeaderAndBody from './components/pages/header-and-body';
import ViewersPage from './pages/viewers/viewers-page';
import LoadingPage from './pages/loading/loading-page';
import { UserSettings } from './lib/user-settings';

export default function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function pullUserDrives(): Promise<void> {
      await window.api.storage.storeUserDrives();
      setIsLoading(false);
    }

    // Calls the necessary initial load functions
    // Loads the user's drive letters and stores them
    pullUserDrives();
    // Initializes the user's settings object
    UserSettings.initializeUserSettings();
  }, []);

  // Add an actual loading screen
  if (isLoading) return <LoadingPage />;

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
          <Route path="/viewers/:viewerId" element={<ViewersPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
