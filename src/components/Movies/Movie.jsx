import React from "react";
import { Box } from "../Box";
import { Error } from "../Error";
import { List } from "../List";
import { MovieItem } from "./MovieItem";
import Spinner from "../Spinner/Spinner";

export function Movie({ isLoading }) {
    return (
        <Box>
            <Error />
            {isLoading && <Spinner />}
            <List className="list-movies">
                <MovieItem />
            </List>
        </Box>
    );
}