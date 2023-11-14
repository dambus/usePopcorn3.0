import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RiMovie2Fill } from 'react-icons/ri'
import Loader from './Loader'
import StarRating from './StarRating'
import ButtonClose from './ButtonClose'

const KEY = 'f86addd7'

const SpringModal = ({
  isOpen,
  setIsOpen,
  selectedId,
  handleCloseMovie,
  onAddWatched,
  // onAddToWatch,
  watched,
  toWatch,
}) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState(0)

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

  const {
    Poster: poster,
    Title: title,
    Plot: plot,
    Year: year,
    imdbRating,
    Director: director,
    Actors: actors,
    Genre: genre,
    Runtime: runtime,
  } = movie

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

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
    }

    onAddWatched(newWatchedMovie)
  }

  // function handleAddto() {
  //   const newToWatchMovie = {
  //     imdbIDTo: selectedId,
  //     titleTo,
  //     yearTo,
  //     posterTo,
  //     imdbRatingTo: Number(imdbRating),
  //     runtimeTo: Number(runtime.split(' ').at(0)),
  //   }

  //   onAddToWatch(newToWatchMovie)
  // }

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  const isToWatch = toWatch.map((movie) => movie.imdbID).includes(selectedId)

  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)
    ?.userRating

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={function () {
            setIsOpen(false)
            handleCloseMovie()
          }}
          className="modal-backdrop bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-auto max-h-[82.5vh] md:max-h-[90vh]"
          >
            {/* background image */}
            <RiMovie2Fill className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />

            {isLoading ? (
              <Loader />
            ) : (
              <div className="relative z-10">
                {/* POSTER */}

                <div className="max-w-[280px] grid place-items-center mx-auto relative">
                  <img className="relative" src={poster} alt=""></img>
                  <span className="absolute top-0 right-0 py-2 px-3 bg-[#f25757] rounded-bl-md">
                    {imdbRating} ⭐
                  </span>
                </div>
                <h3 className="leading-[1] mt-2 mb-1 text-3xl font-bold text-center ">
                  {title}
                </h3>
                <p className="text-center mt-0 mx-auto mb-4 font-light text-sm">
                  {genre}, 🕜 {runtime}
                </p>

                <span className="absolute top-[1.25rem] -rotate-90 font-bold text-3xl -left-[2.25rem] max-w-[5ch] leading-[1]">
                  {year}
                </span>
                <p className="my-4 text-sm">{plot}</p>
                <p className="my-1 text-sm">
                  <strong>Director:</strong> {director}
                </p>
                <p className="my-1 text-sm">
                  <strong>Cast:</strong> {actors}
                </p>

                <div className="flex gap-2 mt-4"></div>

                <div className="grid gap-2 my-4 items-center mx-auto border-t-2 border-slate-50/10 pt-2">
                  {!isWatched ? (
                    <>
                      <p className="text-center">
                        Seen this movie? Would you like to rate it?
                      </p>
                      <StarRating
                        maxRating={10}
                        size={18}
                        onSetRating={setUserRating}
                        defaultRating={userRating}
                      />
                      {userRating > 0 && (
                        <button
                          className="bg-indigo-500 hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                          onClick={handleAdd}
                        >
                          + Add to list
                        </button>
                      )}

                      {!isToWatch ? (
                        <button
                          className="bg-indigo-500 hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                          onClick={null}
                        >
                          Cool, add this on my to-watch list
                        </button>
                      ) : (
                        <p className="text-center text-green-400">
                          You added this movie to your watch list
                        </p>
                      )}
                      <button
                        onClick={handleCloseMovie}
                        className="bg-transparent border-2 border-white/10 hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                      >
                        Nah, go back
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-300 text-center mt-2">
                        You rated this movie {watchedUserRating} <span>⭐</span>
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}
            <ButtonClose clickAction={handleCloseMovie} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SpringModal
