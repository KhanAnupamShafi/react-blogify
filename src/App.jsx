import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import BlogDetailPage from './pages/BlogDetailPage';
import CreateBlogPage from './pages/CreateBlogPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';
import PrivateRoutes from './routes/PrivateRoute';
import PublicRoutes from './routes/PublicRoute';

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial="false" onExitComplete={() => false}>
      <Routes location={location} key={location.pathname}>
        <Route element={<PrivateRoutes />}>
          <Route element={<CreateBlogPage />} path="/create-blog" />
          <Route element={<CreateBlogPage />} path="/edit-blog" />
        </Route>

        <Route element={<PublicRoutes />}>
          <Route element={<HomePage />} path="/" exact />
          <Route element={<ProfilePage />} path="/profile" />
          <Route element={<ProfilePage />} path="/profile/:profileId" />
          <Route element={<BlogDetailPage />} path="/blog/:blogId" />
        </Route>

        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />

        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
