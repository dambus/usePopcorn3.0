// import Movie from './Movie'
import ToWatchMovie from './ToWatchMovie'

function ToWatchList({
  toWatch,
  onDeleteToWatch,
  onClickMovie,
  setToWatchModalOpen,
}) {
  return (
    <div className="">
      {toWatch.map((movieToWatch) => (
        <ToWatchMovie
          movie={movieToWatch}
          key={movieToWatch.imdbID}
          onDeleteToWatch={onDeleteToWatch}
          onClickMovie={onClickMovie}
          setToWatchModalOpen={setToWatchModalOpen}
        />
      ))}
    </div>
  )
}

export default ToWatchList
