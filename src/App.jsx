import { useState, useEffect } from 'react'
import './App.css'
import './assets/scss/main.scss'
import Loader from './Loader'
import Search from './Search'
import MoviesList from './MoviesList'
import Wrapper from './Wrapper'
import SpringModal2 from './SpringModal2'
import WatchedListModal from './WatchedListModal'
import Button from './Button'

const KEY = 'f86addd7'

function App() {
  const [query, setQuery] = useState('')
  // const [displayMessage, setDisplayMessage] = useState('')
  // const [error, setError] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [watched, setWatched] = useState([])
  const [watchedModalOpen, setWatchedModalOpen] = useState(false)

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

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }

  function handleWatchedList() {
    setWatchedModalOpen(true)
  }

  return (
    <>
      <Wrapper>
        <Main>
          <ActionPanel>
            <h1 className="app-heading">
              my<span>Popcorn</span>
            </h1>
            <Search query={query} setQuery={setQuery} />
            <Button
              type="primary"
              text="my list"
              buttonIcon=""
              clickAction={handleWatchedList}
            />
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
          </ResultsModule>
          {selectedId && (
            <SpringModal2
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              isLoading={isLoading}
              selectedId={selectedId}
              handleCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
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
