import { useState, useEffect } from 'react'
import './App.css'
import Loader from './Loader'
import './assets/scss/main.scss'
import Search from './Search'
import MoviesList from './MoviesList'
import MovieDetails2 from './MovieDetails2'
// import { Button, Modal } from 'flowbite-react'

const KEY = 'f86addd7'

function App() {
  const [query, setQuery] = useState('')
  // const [displayMessage, setDisplayMessage] = useState('')
  // const [error, setError] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [detailsOpened, setDetailsOpened] = useState(false)
  const [openModal, setOpenModal] = useState(false)

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
    setDetailsOpened(true)
    setOpenModal(true)
  }

  // const modalStyle = {
  //   backgroundColor: 'red',
  // }

  return (
    <>
      <MovieDetails2
        selectedId={selectedId}
        setOpenModal={setOpenModal}
        setDetailsOpened={setDetailsOpened}
        openModal={openModal}
        detailsOpened={detailsOpened}
      />
      {/* {selectedId && (
        <Modal
          dismissible
          position="center-right"
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <Modal.Header>Small modal</Modal.Header>
          <Modal.Body>
            <MovieDetails
              selectedId={selectedId}
              detailsOpened={detailsOpened}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setOpenModal(false)}>I accept</Button>
          </Modal.Footer>
        </Modal>
      )} */}

      <Main>
        <SearchModule>
          <h1>usePopcorn</h1>
          <Search query={query} setQuery={setQuery} />
        </SearchModule>
        <ResultsModule>
          {isLoading ? (
            <Loader />
          ) : (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </ResultsModule>

        <DetailsModule></DetailsModule>
      </Main>
    </>
  )
}

function Main({ children }) {
  return <div className="main-window wrapper">{children}</div>
}
function SearchModule({ children }) {
  return <div className="search-module">{children}</div>
}

function ResultsModule({ children }) {
  return <div className="results-module">{children}</div>
}

function DetailsModule({ children }) {
  return <div className="details-module">{children}</div>
}

export default App
