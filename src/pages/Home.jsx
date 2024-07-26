import { useState } from 'react';
import axios from 'axios';
import './Home.css';
import useAuth from '../hooks/useAuth';

const Home = () => {
    const [query, setQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const { user } = useAuth();

    const fetchMovies = async () => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/search/movie?api_key=2f89096ba58d4500ef539e035743ae3c&query=${query}`
            );
            setMovies(response.data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if(!query){
            alert("Enter movie details")
        }
        if (query) {
            fetchMovies();
        }
    };

    const handleAddToWatchlist = (movie) => {
        const watchlist = JSON.parse(localStorage.getItem(`${user}-watchlist`)) || [];
        if (!watchlist.find(m => m.id === movie.id)) {
            watchlist.push(movie);
            alert("Added Successfully")
            localStorage.setItem(`${user}-watchlist`, JSON.stringify(watchlist));
        } else {
            alert('Movie already in watchlist');
        }
    };

    return (
        <div className="home-container">
            <form className="search-form" onSubmit={handleSearch}>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search movies"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>
            <div className="movies">
                {movies.map((movie) => (
                    <div key={movie.id} className="movie">
                        {movie.poster_path && (
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                                className="movie-poster"
                            />
                        )}
                        <h2 className="movie-title">{movie.title}</h2>
                        <p className="movie-release-date">Release Date: {movie.release_date}</p>
                        <p className="movie-rating">Rating: {movie.vote_average}</p>
                        <button onClick={() => handleAddToWatchlist(movie)} className="add-to-watchlist-button">
                            Add to Watchlist
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
