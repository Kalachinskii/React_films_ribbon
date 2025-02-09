// const API_KEY = "4a518b6c";

export async function getMovies(query, controller) {
    try {
        const resp = await fetch(
            `/api?apikey=${import.meta.env.VITE_API_KEY}&s=${query}`,
            {
                signal: controller.signal,
            }
        );

        if (!resp.ok) throw new Error("Request error");
        const data = await resp.json();
        if (data.Response === "False") {
            throw new Error("Response error - ненайден фильм");
        }
        return data;
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("предыдущий запрос отменен");
        }
    }
}

export async function getMoviesDescription(id) {
    try {
        const resp = await fetch(
            `/api?apikey=${import.meta.env.VITE_API_KEY}&i=${id}`
        );

        if (!resp.ok) throw new Error("Request error");
        const data = await resp.json();
        if (data.Response === "False") {
            throw new Error("Response error - ненайден этот фильм");
        }
        return data;
    } catch (error) {
        if (error.name === "AbortError") {
            console.log("предыдущий запрос отменен");
        }
    }
}

/*                          debounce
export async function getMovies(query) {
    try {
        const resp = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`
        );

        if (!resp.ok) throw new Error("Request error");
        const data = await resp.json();
        if (data.Response === "False") {
            throw new Error("Response error - ненайден фильм");
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}
*/
