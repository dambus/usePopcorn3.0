import Movie from './Movie'
function MoviesList({ movies }) {
  return (
    <div>
      <h3>Search results:</h3>
      <ul>
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            // onSelectMovie={onSelectMovie}
          />
        ))}
      </ul>
    </div>
  )
}

export default MoviesList
