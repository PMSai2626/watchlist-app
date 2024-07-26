// src/MovieList.js

import  { useState, useEffect } from 'react';
import axios from 'axios';

const Dummy = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(''); // to handle search input

  useEffect(() => {
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

    if (query) {
      fetchMovies();
    }
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(e.target.search.value);
  };

  return (
    <div>
      <h1>Movie List</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search for a movie..." />
        <button type="submit">Search</button>
      </form>
      <div className="movies">
        {movies.map((movie) => (
          <div key={movie.id} className="movie">
            <h2>{movie.title}</h2>
            <p>Release Date: {movie.release_date}</p>
            <p>Rating: {movie.vote_average}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dummy;
