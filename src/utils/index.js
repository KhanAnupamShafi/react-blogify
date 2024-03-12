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
  // Automatically scrolls to top whenever pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

let MAX_WORDS = 35;
const getPreviewContent = (content) => {
  const words = content.split(/\s+/);
  if (words.length <= MAX_WORDS) {
    return content;
  } else {
    const previewWords = words.slice(0, MAX_WORDS);
    return previewWords.join(' ') + '...';
  }
};

export { ScrollToTop, getFormattedDate, getPreviewContent };
