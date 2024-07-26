import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Movielist.css'; 

const MovieList = () => {
    const { user } = useAuth();
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const storedWatchlist = localStorage.getItem(`${user}-watchlist`);
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
            {watchlist.length === 0 ? (
                <p>Your watchlist is empty.</p>
            ) : (
                watchlist.map((movie) => (
                    <div key={movie.id} className="watchlist-item">
                        {movie.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                                className="watchlist-poster"
                            />
                        )}
                        <h2 className="watchlist-title">{movie.title}</h2>
                        <div className="watchlist-buttons">
                            <Link to={`/movie/${movie.id}`} className="details-button">Movie Details</Link>
                            <button onClick={() => handleRemove(movie.id)} className="remove-button">Remove</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default MovieList;
