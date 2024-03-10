import { useEffect, useRef } from 'react';

const SearchInput = ({ isOpen, onQueryChange }) => {
  const searchRef = useRef();
  useEffect(() => {
    if (isOpen) {
      searchRef.current.focus();
    }
  }, [isOpen]);
  return (
    <div>
      <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
        Search for Your Desire Blogs
      </h3>
      <input
        onChange={onQueryChange}
        ref={searchRef}
        type="text"
        placeholder="Start Typing to Search"
        className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
      />
    </div>
  );
};

export default SearchInput;
