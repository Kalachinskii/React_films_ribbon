import { MovieBlock } from "../../Movies";
import { Navbar } from "../../Nav";
import { WatchedBlock } from "../../Watched";
import { useGetMovies } from "../model/useGetMovies";
// import { debounce, values } from "lodash";

export function App() {
  const {searchHandler,
    numResults,
    isLoading,
    error,
    movies,
    activeMovie,
    setActiveMovie} = useGetMovies();

  return (
    <>
      <Navbar onSearch={searchHandler} numResults={numResults}/>
      <main className="main">
        <MovieBlock isLoading={isLoading} error={error} movies={movies} activeMovie={activeMovie} setActiveMovie={setActiveMovie}/>
        <WatchedBlock id={activeMovie}/>
      </main>
    </>
  );
}

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