import { Route, Routes } from 'react-router-dom';
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
  return (
    <>
      <Routes>
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
    </>
  );
}

export default App;
