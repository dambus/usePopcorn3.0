import { useState, useEffect } from 'react'
import SpringModal2 from './SpringModal2'

const KEY = 'f86addd7'

function MovieDetails2({ selectedId, isOpen, setIsOpen }) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)

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
      }
      getMovieDetails()
    },
    [selectedId],
  )

  useEffect(
    function () {
      if (!movie.Title) return
      document.title = `Movie: ${movie.Title}`

      return function () {
        document.title = 'usePopcorn'
      }
    },
    [movie.Title],
  )

  return (
    <>
      {selectedId && (
        <SpringModal2
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoading={isLoading}
          movie={movie}
        ></SpringModal2>
      )}
    </>
  )
}

export default MovieDetails2
