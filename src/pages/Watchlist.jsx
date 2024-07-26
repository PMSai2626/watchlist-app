import { useState, useEffect } from 'react';
import MovieList from '../components/Movie/Movielist';
import useAuth from '../hooks/useAuth';
import './Watchlist.css'; // Import the CSS file

const Watchlist = () => {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    // Use email as a unique identifier
    const userWatchlistKey = `${user}-watchlist`;
    const storedWatchlist = localStorage.getItem(userWatchlistKey);
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist));
    }
  }, [user]);

  const handleRemove = (id) => {
    const updatedWatchlist = watchlist.filter((movie) => movie.id !== id);
    setWatchlist(updatedWatchlist);
    localStorage.setItem(`${user}-watchlist`, JSON.stringify(updatedWatchlist));
  };

  return (
    <div className="watchlist-container">
      <MovieList movies={watchlist} onRemove={handleRemove} />
    </div>
  );
};

export default Watchlist;
