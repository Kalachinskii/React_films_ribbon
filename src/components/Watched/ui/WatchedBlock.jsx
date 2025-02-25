import { Box } from "../../Box/ui/Box";
import { Details } from "./Details";
import { WatchedItem } from "./WatchedItem";
import { Summary } from "./Summary";
import { List } from "../../List/ui/List";
import Spinner from "../../Spinner/ui/Spinner";
import { useState } from "react";

export function WatchedBlock({ id, onSetActiveMovie }) {
    return (
        <Box>
            {id && <Details id={id} onReset={onSetActiveMovie} />}

            {!id && (
                <>
                    <Summary />
                    <List>
                        <WatchedItem />
                    </List>
                </>
            )}
        </Box>
    );
}
