import { Box } from "../../Box/ui/Box";
import { Details } from "./Details";
import { WatchedItem } from "./WatchedItem";
import { Summary } from "./Summary";
import { List } from "../../List/ui/List";
import { useState } from "react";

export function WatchedBlock({ id, onSetActiveMovie }) {
    const [ratedMovies, setRatedMovies] = useState([]);
    console.log(ratedMovies);

    return (
        <Box>
            {id && (
                <Details
                    id={id}
                    onReset={onSetActiveMovie}
                    ratedMovies={ratedMovies}
                    setRatedMovies={setRatedMovies}
                />
            )}

            {!id && (
                <>
                    <Summary movies={ratedMovies} />
                    <List>
                        {ratedMovies?.map((movie) => (
                            <WatchedItem key={movie.id} {...movie} />
                        ))}
                    </List>
                </>
            )}
        </Box>
    );
}
