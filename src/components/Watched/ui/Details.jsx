// import StarRaiting from "../../StarRating/ui/StarRaiting";
import { useGetMovieDescription } from "../model/useGetMovieDescription";
import Spinner from "../../Spinner/ui/Spinner";
import { Error } from "../../Error";
import StarRaiting from "./StarRating/StarRaiting";
import { useMovieRating } from "../model/useMovieRating";

export function Details({ id }) {
    const { description, isLoading, errorMsg } = useGetMovieDescription(id);
    const { rating, ratedMovies, movieIndex, setRating, setRatedMovies } =
        useMovieRating(id);

    if (isLoading)
        return (
            <div className="spinner-wrapper">
                <Spinner />
            </div>
        );

    if (errorMsg) {
        return <Error msg={errorMsg} />;
    }

    return (
        <div className="details">
            <header>
                <button className="btn-back">&larr;</button>
                <img src={description?.Poster} />
                <div className="details-overview">
                    <h2>{description?.Title}</h2>
                    <p>
                        {description?.Released}&bull; {description?.Runtime}
                    </p>
                    <p>{description?.Genre}</p>
                    <p>
                        <span>⭐️</span>
                        {description?.imdbRating} IMDb rating
                    </p>
                </div>
            </header>

            <section>
                <div className="rating">
                    {movieIndex === -1 && (
                        <StarRaiting rating={rating} setRating={setRating} />
                    )}

                    {!!rating && movieIndex === -1 && (
                        <button
                            onClick={() => {
                                // setAdded(true);
                                setRatedMovies((oldMovies) => [
                                    ...oldMovies,
                                    { id, rating },
                                ]);
                            }}
                            className="btn-add"
                        >
                            + Add to list
                        </button>
                    )}
                    {movieIndex !== -1 && (
                        <p>
                            You rated with movie 7
                            {ratedMovies[movieIndex]?.rating}
                            <span>⭐️</span>
                        </p>
                    )}
                </div>
                <div className="details-overview">
                    <p>
                        <em>{description?.Plot}</em>
                    </p>
                    <p>Starring actors: {description?.Actors}</p>
                    <p>Directed by: {description?.Director}</p>
                </div>
            </section>
        </div>
    );
}
