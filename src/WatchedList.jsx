// import Movie from './Movie'
import WatchedMovie from './WatchedMovie'

function WatchedList({ watched, onDeleteWatched }) {
  return (
    <div className="watched-list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </div>
  )
}

export default WatchedList
