import { AiFillDelete } from 'react-icons/ai'

function WatchedMovie({ movie, onDeleteWatched, onSelectMovie }) {
  return (
    <div className="watched-movie" key={movie.imdbID}>
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
            <span>🌟 Your rating: </span>
            <span className="font-bold">{movie.userRating}</span>
          </p>
          <p>
            <span>⏳ Duration: </span>
            <span>{movie.runtime} min</span>
          </p>
        </div>
      </div>
      <AiFillDelete
        className="text-white/50 hover:text-red-300 justify-self-end hover:scale-110 transition-all cursor-pointer"
        size={24}
        onClick={() => onDeleteWatched(movie.imdbID)}
      />
      <button onClick={() => onSelectMovie(movie.imdbID)}>delete</button>
    </div>
  )
}

export default WatchedMovie
