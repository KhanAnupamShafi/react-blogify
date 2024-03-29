import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
import ProfileProvider from '../context/providers/ProfileProvider';
import { ScrollToTop } from '../utils';
const PublicRoute = () => {
  return (
    <>
      <>
        <ProfileProvider>
          <Header />
          <main className="min-h-[70vh]">
            <section className="container">
              <Outlet />
            </section>
          </main>
          <Footer />
          <ScrollToTop />
        </ProfileProvider>
      </>
    </>
  );
};

export default PublicRoute;
