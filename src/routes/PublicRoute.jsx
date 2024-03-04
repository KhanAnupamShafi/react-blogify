import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Header from '../components/layout/Header';
const PublicRoute = () => {
  return (
    <>
      <Header />
      <main className="">
        <section className="container">
          <Outlet />
        </section>
      </main>
      <Footer />
    </>
  );
};

export default PublicRoute;
