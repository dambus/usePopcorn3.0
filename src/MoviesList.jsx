import Movie from './Movie'
function MoviesList({ movies }) {
  return (
    <>
      <h3>Search results:</h3>
      <div className="movie-list">
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
    </>
  )
}

export default MoviesList
