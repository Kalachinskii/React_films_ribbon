import React from "react";

export function WatchedItem({ imdbRating, poster, rating, runtime, title }) {
    return (
        <li>
            <img src={poster} alt={title} />
            <h3>{title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{rating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{imdbRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{runtime}</span>
                </p>
            </div>
        </li>
    );
}
