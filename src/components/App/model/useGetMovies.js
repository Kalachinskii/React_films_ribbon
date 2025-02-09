import { useEffect, useRef, useState } from "react";
import { getMovies } from "../api";

export function useGetMovies() {
    const [numResults, setNumResults] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    // ссылка - данные не обнуляються при перерендере
    const abortController = useRef(null);
    const [isError, setIsError] = useState(false);
    const [movies, setIsMovies] = useState([]);
    const [activeMovie, setActiveMovie] = useState();

    // аборт контроллер
    async function searchHandler(value) {
        // убераеем error при пустой строке поиска
        if (!value) {
            setIsError(false);
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
        setIsError(false);
        const data = await getMovies(value, controller);
        // убераем loading при получении данных
        setIsLoading(false);
        !data ? setIsError(true) : setIsError(false);
        data?.Search ? setIsMovies(data.Search) : setIsMovies([]);
        setNumResults(data?.totalResults || 0);
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
        isError,
        movies,
        activeMovie,
        setActiveMovie,
    };
}
