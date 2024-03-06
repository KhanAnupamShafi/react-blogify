import { Navigate, Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import { useAuthContext } from '../hooks/useAuthContext';

const PrivateRoute = () => {
  const { auth } = useAuthContext();
  return (
    <>
      {auth?.accessToken ? (
        <>
          <Header />
          <main className="mx-auto max-w-[1020px] py-8">
            <section className="container">
              <Outlet />
            </section>
          </main>
          <Footer />
        </>
      ) : (
        <Navigate to={'/login'} />
      )}
    </>
  );
};

export default PrivateRoute;
