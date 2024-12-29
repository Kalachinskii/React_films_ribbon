const API_KEY = "4a518b6c";

export async function getMovies(query, controller, setIsLoading) {
    try {
        setIsLoading(true);
        const resp = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            {
                signal: controller.signal,
            }
        );

        if (!resp.ok) throw new Error("Request error");
        const data = await resp.json();
        setIsLoading(false);
        if (data.Response === "False") {
            throw new Error("Response error - ненайден фильм");
        }
        return data;
    } catch (error) {
        error.name === "AbortError"
            ? console.log("предыдущий запрос отменен")
            : console.log(error);
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
