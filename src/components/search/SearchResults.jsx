import { useEffect, useState } from 'react';
import { instance } from '../../api/axiosInstance';
import SearchedBlog from './SearchedBlog';

const SearchResults = ({ searchInput, isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    if (!isOpen) {
      setSearchResults([]);
      setLoading(false);
      setError('');
      return; // Exit early if modal is closed
    }

    if (searchInput.trim() === '') {
      setSearchResults([]);
      setLoading(false);
      return; // Exit early If searchInput is empty
    }

    setLoading(true);
    const fetchBlogs = async () => {
      try {
        const response = await instance.get(
          `${import.meta.env.VITE_SERVER_BASE_URI}/search?q=${searchInput}`
        );
        if (response.status === 200) {
          setSearchResults(response.data.data);
        }
      } catch (err) {
        setError(err?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();

    return () => {
      setError('');
      setLoading(false);
      setSearchResults([]); // if unmount set loader to false
    };
  }, [searchInput, isOpen]);

  return (
    <div className="">
      <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
      <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px]">
        {error && (
          <div>
            {error} for query:{' '}
            <span className="italic text-red-500">
              &ldquo; {searchInput} &rdquo;
            </span>
          </div>
        )}
        {loading ? (
          <div>Loading...</div>
        ) : searchInput?.length === 0 ? (
          <div>Start typing to search </div>
        ) : (
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            {searchResults.map((blog) => (
              <SearchedBlog key={blog.id} blog={blog} onClose={onClose} />
            ))}
          </div>
        )}{' '}
      </div>
    </div>
  );
};

export default SearchResults;
