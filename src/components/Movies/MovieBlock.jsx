import React, { useState } from "react";
import { Box } from "../Box/Box";
import { Error } from "../Error/Error";
import { List } from "../List/List";
import { MovieItem } from "./MovieItem";
import Spinner from "../Spinner/Spinner";

export function MovieBlock({ isLoading, isError, movies }) {
    const [activeMovie, setActiveMovie] = useState();
    const movieClickHandler = (id) => {
        setActiveMovie(id);
    }
    
    return (
        <Box>
            {isError && <Error />}
            {isLoading && (
                    <div className="spinner-wrapper">
                        <Spinner />
                    </div>
                )}
            <List className="list-movies">
                {
                    // проходимся по массиву фильмов и прокидываем на отрисовку
                    movies && movies.map((item, ind) => 
                    <MovieItem 
                        key={ind} 
                        movie={item} 
                        isActive={activeMovie === item.imdbID ? true : false} 
                        movieClickHandler={movieClickHandler}
                    />)
                }
                
            </List>
        </Box>
    );
}