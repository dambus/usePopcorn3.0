import { motion } from 'framer-motion'
function Movie({ movie, onSelectMovie }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.01,
        cursor: 'pointer',
        transition: { duration: 0.2 },
      }}
    >
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
    </motion.div>
  )
}

export default Movie
