import { lazy, Suspense, useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner'
import { useDebounce } from 'react-use';
import { fetchMovies, fetchTrendingMovies } from './api/movies';
const MovieList = lazy(() => import("./components/MovieList"));
const TrendingMoviesList = lazy(() => import("./components/TrendingMovies"));

const trendingMovies = fetchTrendingMovies();

function App() {

  const [searchTerm, setSearchTerm] = useState('');
  const [deboinceSearchTerm, setDeboinceSearchTerm] = useState('');
  const [moviesList, setmoviesList] = useState([]);

  useDebounce(() => setDeboinceSearchTerm(searchTerm), 1000, [searchTerm])

  useEffect(() => {
    setmoviesList(fetchMovies(deboinceSearchTerm));
  }, [deboinceSearchTerm])

  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hussle</h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='trending'>
          <h2>Trending Movies</h2>
          <Suspense fallback={<Spinner />}>
            <TrendingMoviesList response={trendingMovies} />
          </Suspense>
        </section>

        <section className="all-movies">
          <h2 className=''>All Movies</h2>
          <Suspense fallback={<Spinner />}>
            <MovieList moviesList={moviesList} />
          </Suspense>
        </section>

      </div>
    </main>
  )
}

export default App
