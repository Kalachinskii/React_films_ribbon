import { useEffect, useState } from "react";
import { getMoviesDescription } from "../api";

export function useGetMovieDescription(id) {
    const [description, setDescription] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // useEffect(() => {}, зависимости)
    // когда зависим от пропса то ложи в UseEffect
    // [] - запуск 1 раз при рендере компонента
    // [id] - каждыйраз когда придёт id запускает
    // [id, переменныеState]
    useEffect(() => {
        setIsLoading(true);
        getMoviesDescription(id)
            .then((data) => {
                if (data.Response === "False") {
                    throw new Error("Response error - ненайден этот фильм");
                }
                setDescription(data);
                setIsLoading(false);
                // throw new Error("упс ... ошибочка");
            })
            .catch((err) => setError(err.message));

        //                    async/await
        // async function getDescription() {
        //     const data = await getMoviesDescription(id);
        //     setDescription(data)
        //         console.log(description);
        //         setIsLoading(false);
        // }
        // getDescription()
    }, [id]);

    return {
        description,
        isLoading,
        errorMsg: error,
    };
}
