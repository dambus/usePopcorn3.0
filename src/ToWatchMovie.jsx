import { AiFillDelete } from 'react-icons/ai'

function ToWatchMovie({
  movie,
  onDeleteToWatch,
  onClickMovie,
  // setToWatchModalOpen,
}) {
  return (
    <div className="flex flex-row">
      <div
        className="watched-movie"
        key={movie.imdbID}
        onClick={() => {
          onClickMovie(movie.imdbID)
          // setToWatchModalOpen(false)
        }}
      >
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          className="md:max-w-[90px]"
        />
        <div className="watched-movie--details">
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️ IMDB rating: </span>
              <span className="font-bold">{movie.imdbRating}</span>
            </p>

            <p>
              <span>⏳ Duration: </span>
              <span>{movie.runtime} min</span>
            </p>
          </div>
        </div>
      </div>
      <AiFillDelete
        className="text-white/50 hover:text-red-300 justify-self-end hover:scale-110 transition-all cursor-pointer"
        size={48}
        onClick={() => onDeleteToWatch(movie.imdbID)}
      />
    </div>
  )
}

export default ToWatchMovie
