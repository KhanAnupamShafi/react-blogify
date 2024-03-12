import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import ProfileProvider from '../context/providers/ProfileProvider';
import { useAuthContext } from '../hooks/useAuthContext';

const PrivateRoute = () => {
  const { auth } = useAuthContext();
  const location = useLocation();

  return (
    <>
      {auth?.accessToken ? (
        <>
          <>
            <ProfileProvider>
              <Header />
              <main className="">
                <section className="container">
                  <Outlet />
                </section>
              </main>
              <Footer />
            </ProfileProvider>
          </>
        </>
      ) : (
        <Navigate to={'/login'} replace state={{ redirectTo: location }} />
      )}
    </>
  );
};

export default PrivateRoute;
