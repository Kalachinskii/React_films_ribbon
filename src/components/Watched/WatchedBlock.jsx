import { Box } from "../Box/Box";
import { Details } from "./Details";
import { WatchedItem } from "./WatchedItem";
import { Summary } from "./Summary";
import { List } from "../List/List";
import Spinner from "../Spinner/Spinner";

export function WatchedBlock({id}) {
    return (
        <Box>
            {id && <Details id={id}/>}

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