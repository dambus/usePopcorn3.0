import { useState, useEffect } from 'react'
import './App.css'
import './assets/scss/main.scss'
import Logo from './Logo'
import Loader from './Loader'
import Search from './Search'
import MoviesList from './MoviesList'
import Wrapper from './Wrapper'
import WatchedListModal from './WatchedListModal'
import ToWatchListModal from './ToWatchListModal'
import Button from './Button'
import MovieDetailsModal from './MovieDetailsModal'
import { RiMovie2Fill } from 'react-icons/ri'
import { TiInputChecked } from 'react-icons/ti'

const KEY = 'f86addd7'

function App() {
  const [query, setQuery] = useState('')
  // const [displayMessage, setDisplayMessage] = useState('')
  // const [error, setError] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [watched, setWatched] = useState(() => {
    const watchedItems = JSON.parse(localStorage.getItem('watchedMovies'))
    if (watchedItems) {
      return watchedItems
    } else {
      return []
    }
  })

  const [toWatch, setToWatch] = useState(() => {
    const toWatchItems = JSON.parse(localStorage.getItem('toWatchMovies'))
    if (toWatchItems) {
      return toWatchItems
    } else {
      return []
    }
  })
  const [watchedModalOpen, setWatchedModalOpen] = useState(false)
  const [toWatchModalOpen, setToWatchModalOpen] = useState(false)

  useEffect(
    function () {
      localStorage.setItem('watchedMovies', JSON.stringify(watched))
    },
    [watched],
  )

  useEffect(
    function () {
      localStorage.setItem('toWatchMovies', JSON.stringify(toWatch))
    },
    [toWatch],
  )

  useEffect(() => {
    const timeOutId = setTimeout(() => setSelectedId(null), 300)
    return () => clearTimeout(timeOutId)
  }, [query])

  useEffect(
    function () {
      let controller = new AbortController()
      // setTimeout(() => {
      //   controller.abort
      // }, 1000)
      async function fetchMovies() {
        try {
          setIsLoading(true)
          setMovies([])
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal },
          )
          const data = await res.json()
          setMovies(data.Search)
        } catch (err) {
          // alert(err.message)
          if (err.name !== 'AbortError') {
            alert(err.message)
          }
        } finally {
          setIsLoading(false)
        }
      }
      fetchMovies()
      return function () {
        controller.abort()
      }
    },
    [query],
  )

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id))
    setIsOpen(true)
  }

  function handleCloseMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie])
    // localStorage.setItem("APP_WATCHED", JSON.stringify(watched));
  }
  function handleAddToWatch(movieToWatch) {
    setToWatch((toWatch) => [...toWatch, movieToWatch])
    // localStorage.setItem("APP_WATCHED", JSON.stringify(watched));
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  function handleDeleteToWatch(id) {
    setToWatch((toWatch) =>
      toWatch.filter((movieToWatch) => movieToWatch.imdbID !== id),
    )
  }

  function handleWatchedList() {
    setWatchedModalOpen(true)
  }

  function handleToWatchList() {
    setToWatchModalOpen(true)
  }

  return (
    <>
      <Wrapper>
        <Main>
          <ActionPanel>
            <Logo />
            <h1 className="app-heading">
              my<span>Popcorn</span>
            </h1>
            <Search query={query} setQuery={setQuery} />
            <div className="list-buttons flex flex-row gap-4 pt-2 border-t-2 mt-4 border-white/25">
              <Button
                type="rounded"
                text="watched"
                // buttonIcon=""
                clickAction={handleWatchedList}
                buttonIcon={<TiInputChecked />}
              />
              <Button
                type="rounded"
                text="to watch"
                buttonIcon={<RiMovie2Fill />}
                clickAction={handleToWatchList}
              />
            </div>
          </ActionPanel>
          <ResultsModule>
            {isLoading ? (
              <Loader />
            ) : (
              <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
            )}
            {watchedModalOpen && (
              <WatchedListModal
                watched={watched}
                watchedModalOpen={watchedModalOpen}
                setWatchedModalOpen={setWatchedModalOpen}
                onDeleteWatched={handleDeleteWatched}
              />
            )}

            {toWatchModalOpen && (
              <ToWatchListModal
                toWatch={toWatch}
                toWatchModalOpen={toWatchModalOpen}
                setToWatchModalOpen={setToWatchModalOpen}
                onDeleteToWatch={handleDeleteToWatch}
                onClickMovie={handleSelectMovie}
              />
            )}
          </ResultsModule>
          {selectedId && (
            <MovieDetailsModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isLoading={isLoading}
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              onAddToWatch={handleAddToWatch}
              watched={watched}
              toWatch={toWatch}
            />
          )}
        </Main>
      </Wrapper>
    </>
  )
}

function Main({ children }) {
  return <div className="main-window">{children}</div>
}
function ActionPanel({ children }) {
  return <div className="action-panel">{children}</div>
}

function ResultsModule({ children }) {
  return <div className="results-module">{children}</div>
}

export default App
