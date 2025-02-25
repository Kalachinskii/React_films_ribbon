import { useEffect, useState } from "react";

export function useMovieRating(id) {
    const [rating, setRating] = useState(0);
    const [ratedMovies, setRatedMovies] = useState([]);
    const movieIndex = ratedMovies?.findIndex((movie) => movie.id === id);

    useEffect(() => {
        setRating(0);
    }, [id]);

    return {
        rating,
        ratedMovies,
        movieIndex,
        setRatedMovies,
        setRating,
    };
}
