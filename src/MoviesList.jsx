import Movie from './Movie'
function MoviesList({ movies }) {
  return (
    <>
      <h3>Search results:</h3>
      <div className="movie-list">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            // onSelectMovie={onSelectMovie}
          />
        ))}
      </div>
    </>
  )
}

export default MoviesList
