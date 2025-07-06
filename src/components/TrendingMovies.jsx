// ✅ TrendingMoviesList.jsx
import { use } from 'react';



const TrendingMoviesList = ({ response }) => {
    const movies = use(response);
    return (
        <ul>
            {movies?.map((movie, index) => (
                <li key={movie.$id}>
                    <p>{index + 1}</p>
                    <img src={movie.poster_url} alt={movie.title} />
                </li>
            ))}
        </ul>
    );
};

export default TrendingMoviesList;
