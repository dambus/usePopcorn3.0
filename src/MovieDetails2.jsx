import { useState, useEffect } from 'react'
import Loader from './Loader'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, Modal } from 'flowbite-react'
const KEY = 'f86addd7'

function MovieDetails2({ selectedId, openModal, setOpenModal }) {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  // const [openModal, setOpenModal] = useState(false)

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
      {selectedId && (
        <Modal
          dismissible
          position="center-right"
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>
            <div className="text-md">{movie.Title}</div>
          </Modal.Header>
          <Modal.Body>
            {isLoading ? (
              <Loader />
            ) : (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{
                    opacity: 1,
                    x: '0',
                    transition: { duration: '.3' },
                  }}
                  exit={{ opacity: 0, x: -100 }}
                >
                  <div className="movie-details">
                    <header>
                      <img src={poster} alt={`Poster of ${movie} movie`} />
                      <div className="details-overview">
                        {/* <h2>{title}</h2> */}
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
                </motion.div>
              </AnimatePresence>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal(false)}>I accept</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default MovieDetails2
