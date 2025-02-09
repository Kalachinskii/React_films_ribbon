export async function getMovies(query, controller) {
    const resp = await fetch(
        `/api?apikey=${import.meta.env.VITE_API_KEY}&s=${query}`,
        {
            signal: controller.signal,
        }
    );

    return await resp.json();
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
