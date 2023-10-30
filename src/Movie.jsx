function Movie({ movie }) {
  return (
    <figure>
      <h1>{movie.Title}</h1>
      <p>{movie.Year}</p>
    </figure>
  )
}

export default Movie
