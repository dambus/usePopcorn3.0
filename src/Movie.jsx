function Movie({ movie }) {
  return (
    <figure className="single-movie">
      <img src={movie.Poster} alt={`poster of ${movie.Name}`} />
      <div className="movie-generals">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </figure>
  )
}

export default Movie
