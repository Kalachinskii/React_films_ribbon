import React, { useState } from "react";
import { Box } from "../Box/Box";
import { Error } from "../Error/Error";
import { List } from "../List/List";
import { MovieItem } from "./MovieItem";
import Spinner from "../Spinner/Spinner";

export function MovieBlock({ isLoading, isError, movies, setActiveMovie, activeMovie }) {

    
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
                    movies && movies.map((item) => 
                    <MovieItem 
                        key={item.imdbID} 
                        movie={item} 
                        isActive={activeMovie === item.imdbID ? true : false} 
                        setActiveMovie={setActiveMovie}
                    />)
                }
                
            </List>
        </Box>
    );
}