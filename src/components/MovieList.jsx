import React, { use } from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ moviesList }) => {
    const movies = use(moviesList);

    return (
        <ul>
            {movies && movies?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </ul>
    )
}

export default MovieList
