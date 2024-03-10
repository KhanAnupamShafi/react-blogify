import { useEffect, useRef } from 'react';

const useDebounce = (callback, delay) => {
  const timerIdRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timerIdRef.current) {
        clearTimeout(timerIdRef.current);
      }
    };
  }, []);

  const debouncedSearch = (...args) => {
    // clears already existing timeout
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }

    timerIdRef.current = setTimeout(() => {
      callback(...args);
    }, delay * 1000);
  };
  return debouncedSearch;
};

export default useDebounce;
