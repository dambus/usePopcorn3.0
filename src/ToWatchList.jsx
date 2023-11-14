// import Movie from './Movie'
import ToWatchMovie from './WatchedMovie'

function ToWatchList({ toWatch, onDeleteToWatch }) {
  return (
    <div className="">
      {toWatch.map((movie) => (
        <ToWatchMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteToWatch={onDeleteToWatch}
        />
      ))}
    </div>
  )
}

export default ToWatchList
