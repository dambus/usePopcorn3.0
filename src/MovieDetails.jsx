import { useState, useEffect } from 'react'
import Loader from './Loader'
const KEY = 'f86addd7'

function MovieDetails({ selectedId }) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const {
    Title: title,
    // Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true)
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`,
        )
        const data = await res.json()
        setMovie(data)
        setIsLoading(false)
        // setIsLoading(false)
      }
      getMovieDetails()
    },
    [selectedId],
  )

  useEffect(
    function () {
      if (!title) return
      document.title = `Movie: ${title}`

      return function () {
        document.title = 'usePopcorn'
      }
    },
    [title],
  )
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="movie-details">
          <header>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐ </span>
                <strong>{imdbRating}</strong> IMDb rating
              </p>
            </div>
          </header>
          <section>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>{`Directed by ${director}`}</p>
          </section>
        </div>
      )}
    </>
  )
}

export default MovieDetails
