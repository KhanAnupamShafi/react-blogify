import { useEffect, useState } from 'react';
import CloseSVG from '../../assets/icons/close.svg';
import useDebounce from '../../hooks/useDebounce';
import SearchInput from '../search/SearchInput';
import SearchResults from '../search/SearchResults';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce((query) => {
    setSearchInput(query);
  }, 0.6);
  const handleQueryChange = (e) => {
    debouncedSearch(e.target.value);
  };
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === 'Escape' ? onClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [onClose]);
  // Reset search input when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setSearchInput('');
    }
  }, [isOpen]);

  if (!isOpen) {
    return false;
  }

  return (
    <section
      className={`fixed left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50 ${
        !isOpen && 'hidden'
      }`}>
      <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
        <SearchInput isOpen={isOpen} onQueryChange={handleQueryChange} />
        <SearchResults
          searchInput={searchInput}
          isOpen={isOpen}
          onClose={onClose}
        />

        <button onClick={onClose}>
          <img
            src={CloseSVG}
            alt="Close"
            className="absolute right-2 top-2 cursor-pointer w-8 h-8"
          />
        </button>
      </div>
    </section>
  );
};

export default SearchModal;
