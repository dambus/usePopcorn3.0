// import Movie from './Movie'
import WatchedMovie from './WatchedMovie'

function WatchedList({ watched, onDeleteWatched, onSelectMovie }) {
  return (
    <div className="watched-list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
          // onSelectMovie={onSelectMovie}
          onClick={() => onSelectMovie(movie.imdbID)}
        />
      ))}
    </div>
  )
}

export default WatchedList
