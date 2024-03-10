import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import ProfileProvider from '../context/providers/ProfileProvider';
import { useAuthContext } from '../hooks/useAuthContext';

const PrivateRoute = () => {
  const { auth } = useAuthContext();

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
        <Navigate to={'/login'} />
      )}
    </>
  );
};

export default PrivateRoute;
