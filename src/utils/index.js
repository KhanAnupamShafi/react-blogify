import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const getFormattedDate = (dateString) => {
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = new Date(dateString).toLocaleDateString(
    'en-US',
    options
  );
  return formattedDate;
};

const ScrollToTop = () => {
  // Extracts pathname property(key) from an object
  const { pathname } = useLocation();
  console.log('called');
  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

export { ScrollToTop, getFormattedDate };
