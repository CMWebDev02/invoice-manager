import { BrowserRouter, Route, Routes } from 'react-router';
import './styles/styles.css';
import TitlePage from './pages/title-page/title-page';
import NavBar from './components/user/nav-bar';

export default function App(): React.JSX.Element {
  return (
    <>
      <NavBar />
      <main className="h-[calc(100vh-2.5rem)] w-screen">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TitlePage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
}
