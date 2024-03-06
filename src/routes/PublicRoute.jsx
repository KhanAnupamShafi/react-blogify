import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import ProfileProvider from '../context/providers/ProfileProvider';
const PublicRoute = () => {
  return (
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
  );
};

export default PublicRoute;
