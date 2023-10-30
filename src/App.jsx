import { useState, useEffect } from 'react'
import './App.css'
import Loader from './Loader'
import './assets/scss/main.scss'
import Search from './Search'
import MoviesList from './MoviesList'

const KEY = 'f86addd7'

function App() {
  const [query, setQuery] = useState('')
  const [displayMessage, setDisplayMessage] = useState('')
  // const [error, setError] = useState('')
  const [movies, setMovies] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const timeOutId = setTimeout(() => setDisplayMessage(query), 500)
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
  return (
    <>
      <h1>usePopcorn</h1>
      <Search query={query} setQuery={setQuery} />

      <p>{displayMessage}</p>
      {isLoading && <Loader />}
      <MoviesList movies={movies} />
    </>
  )
}

export default App
