import { useEffect, useRef, useState } from "react";
import { getMovies } from "../api";

export function useGetMovies() {
    const [numResults, setNumResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    // ссылка - данные не обнуляються при перерендере
    const abortController = useRef(null);
    const [error, setError] = useState();
    const [movies, setIsMovies] = useState([]);
    const [activeMovie, setActiveMovie] = useState();

    // аборт контроллер
    async function searchHandler(value) {
        // убераеем error при пустой строке поиска
        if (!value) {
            setError();
            setNumResults(0);
            return;
        }

        // при быстром вводе отменяй и и повторно отправляй запрос
        if (abortController.current) {
            abortController.current.abort();
        }

        const controller = new AbortController();
        // перезаписываем useRef(null);
        abortController.current = controller;
        // установим состояние на Loading и error при 0 фильмов
        setIsLoading(true);
        setError();
        try {
            const data = await getMovies(value, controller);
            if (data.Response === "False") {
                throw new Error("Response error - ненайден фильм");
            }
            // убераем loading при получении данных
            setIsLoading(false);
            // !data ? setIsError(true) : setIsError(false);
            setIsMovies(data.Search);
            setNumResults(data?.totalResults || 0);
        } catch (error) {
            if (error.name !== "AbortError") {
                console.log(error);
                setError(error.message);
                setIsMovies([]);
            }
        }
        setIsLoading(false);
    }

    // при уничтожении компонента - очищай память
    useEffect(() => {
        return () => {
            if (abortController.current) {
                abortController.current.abort();
            }
        };
    }, []);

    return {
        searchHandler,
        numResults,
        isLoading,
        error,
        movies,
        activeMovie,
        setActiveMovie,
    };
}
