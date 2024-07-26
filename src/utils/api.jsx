// src/utils/api.js
const API_KEY = '2f89096ba58d4500ef539e035743ae3c';
const API_URL = `https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=${API_KEY}`;

export const searchMovies = async (title) => {
  const response = await fetch(`${API_URL}&s=${title}`);
  const data = await response.json();
  return data.Search;
};

export const getMovieDetails = async (id) => {
  const response = await fetch(`${API_URL}&i=${id}`);
  const data = await response.json();
  return data;
};
