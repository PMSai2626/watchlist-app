import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Moviedetails.css'; 

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=2f89096ba58d4500ef539e035743ae3c`
                );
                setMovie(response.data);
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };
        fetchMovieDetails();
    }, [id]);

    if (!movie) return <p>Loading...</p>;

    return (
        <div className="movie-details-container">
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="movie-poster" />
            <h1 className="movie-title">{movie.title}</h1>
            <p className="movie-overview">{movie.overview}</p>
            <p className="movie-release-date">Release Date: {movie.release_date}</p>
            <p className="movie-rating">Rating: {movie.vote_average}</p>
        </div>
    );
};

export default MovieDetails;
