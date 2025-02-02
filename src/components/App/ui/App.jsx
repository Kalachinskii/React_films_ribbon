import { useEffect, useRef, useState } from "react";
import { MovieBlock } from "../../Movies";
import { Navbar } from "../../Nav";
import { WatchedBlock } from "../../Watched";
import { getMovies } from "../api";
import { debounce, values } from "lodash";


const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function App() {
  const [numResults, setNumResults] = useState(0);
  const[isLoading, setIsLoading] = useState(false);
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
    setIsError(false)
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
  }, [])

  return (
    <>
      <Navbar onSearch={searchHandler} numResults={numResults}/>
      <main className="main">
        <MovieBlock isLoading={isLoading} isError={isError} movies={movies} activeMovie={activeMovie} setActiveMovie={setActiveMovie}/>
        <WatchedBlock id={activeMovie}/>
      </main>
    </>
  );
}

export default App;


/*                      debounce

const searchHandler = debounce(async(value) => {
  const data = await getMovies(value);
  // console.log(data);
  // setNumResults((prev) prev - это то что лежит в useState(0); т.е. 0
  setNumResults(data?.totalResults || 0);
}, 2000);

// при уничтожении компонента - очищай память
useEffect(() => {
  return () => {
    searchHandler.cancel();
  };
}, [searchHandler])

return (
  <>
    <Navbar onSearch={searchHandler} numResults={numResults}/>
    <main className="main">
      <Movie />
      <Watched />
    </main>
  </>
);
}

export default App;
*/