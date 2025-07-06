import { getTrendingMovies, updateSearchCount } from "../appwrite";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

export const fetchMovies = async (query = "") => {
    try {
      const endpoint = query
        ? `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${BASE_URL}/discover/movie?sort_by=popularity.desc`

      const res = await fetch(endpoint, API_OPTIONS);

      if (!res.ok) throw new Error('Failed To Fetch movies')

      const data = await res.json();
      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0]);
      }

      return data.results || [];
    } catch (error) {
      console.error("Error Fetching movies", error);
    }
  }

  export const fetchTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      return movies || [];
    } catch (error) {
      console.error("Error Fetching Trending Movies", error);
      return [];
    }
  };