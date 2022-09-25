import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';
import AddMovie from './components/AddMovie';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    const response = await fetch('https://swapi.dev/api/films')
    const data = await response.json();
    setMovies(data.results);
    setIsLoading(false);
  }, [])

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  const addMovieHandler = () => {
    console.log(movies);
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
