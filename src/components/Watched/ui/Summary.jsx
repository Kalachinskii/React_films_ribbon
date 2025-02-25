import React from "react";

export function Summary({ movies }) {
    function countAvgRating(key) {
        return (
            movies.reduce(
                (sum, movie) =>
                    sum +
                    (key === "runtime" && movie[key] !== "N/A"
                        ? parseInt(movie[key])
                        : key === "runtime"
                        ? 0
                        : +movie[key]),
                0
            ) / movies.length
        ).toFixed(2);
    }

    return (
        <div className="summary">
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{movies.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{countAvgRating("rating")}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{countAvgRating("imdbRating")}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{countAvgRating("runtime")} min</span>
                </p>
            </div>
        </div>
    );
}
