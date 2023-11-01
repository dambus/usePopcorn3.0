function Movie({ movie, onSelectMovie }) {
  return (
    <figure
      className="single-movie"
      key={movie.imdbID}
      onClick={() => onSelectMovie(movie.imdbID)}
    >
      <img src={movie.Poster} alt={`poster of ${movie.Name}`} />
      <div className="movie-generals">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </figure>
  )
}

export default Movie
