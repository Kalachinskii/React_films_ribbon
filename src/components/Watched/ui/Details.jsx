import React, { useEffect, useState } from "react";
import { getMoviesDescription } from "../../App/api";
import Spinner from "../../Spinner/ui/Spinner";
import StarRaiting from "../../StarRating/ui/StarRaiting";

export function Details({id}) {
    const [description, setDescription] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {}, зависимости)
    // когда зависим от пропса то ложи в UseEffect
    // [] - запуск 1 раз при рендере компонента
    // [id] - каждыйраз когда придёт id запускает
    // [id, переменныеState]
    useEffect(() => {
        setIsLoading(true)
        getMoviesDescription(id).then((data)=>{
            console.log(description);
            setDescription(data)
            setIsLoading(false);
        });

        //                    async/await
        // async function getDescription() {
        //     const data = await getMoviesDescription(id);
        //     setDescription(data)
        //         console.log(description);
        //         setIsLoading(false);
        // }
        // getDescription()
    },[id]);
    
    if (isLoading) return (
        <div className="spinner-wrapper">
            <Spinner />
        </div>
    );

    return (
        <div className="details">
        <header>
            <button className="btn-back">&larr;</button>
            <img src={description?.Poster} />
            <div className="details-overview">
            <h2>{description?.Title}</h2>
            <p>{description?.Released}&bull; {description?.Runtime}</p>
            <p>{description?.Genre}</p>
            <p>
                <span>⭐️</span>
                {description?.imdbRating} IMDb rating
            </p>
            </div>
        </header>

        {/* <p>{avgRating}</p> */}

        <section>
            <div className="rating">
            <StarRaiting />

            <button className="btn-add">+ Add to list</button>
            <p>
                You rated with movie 7 <span>⭐️</span>
            </p>
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