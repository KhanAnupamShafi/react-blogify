import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<HomePage />} path="/" exact />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />

        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  );
}

export default App;
