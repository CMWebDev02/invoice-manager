import { BrowserRouter, Route, Routes } from 'react-router';
import './styles/styles.css';
import TitlePage from './pages/title-page';

export default function App(): React.JSX.Element {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TitlePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
