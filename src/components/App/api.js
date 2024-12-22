const API_KEY = "4a518b6c";

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
