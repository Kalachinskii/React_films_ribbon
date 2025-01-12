import React from "react";
import { Box } from "../Box/Box";
import { Error } from "../Error/Error";
import { List } from "../List/List";
import { MovieItem } from "./MovieItem";
import Spinner from "../Spinner/Spinner";

export function Movie({ isLoading, isError }) {
    return (
        <Box>
            {isError && <Error />}
            {isLoading && (
                    <div className="spinner-wrapper">
                        <Spinner />
                    </div>
                )}
            <List className="list-movies">
                <MovieItem />
            </List>
        </Box>
    );
}