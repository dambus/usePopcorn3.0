import { AnimatePresence, motion } from 'framer-motion'
import { TiInputChecked } from 'react-icons/ti'
import { GiWindsock } from 'react-icons/gi'
import WatchedList from './WatchedList'
import ButtonClose from './ButtonClose'

const WatchedListModal = ({
  watchedModalOpen,
  setWatchedModalOpen,
  watched,
  onDeleteWatched,
  onSelectMovie,
}) => {
  return (
    <AnimatePresence>
      {watchedModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setWatchedModalOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: '12.5deg' }}
            animate={{ scale: 1, rotate: '0deg' }}
            exit={{ scale: 0, rotate: '0deg' }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white p-6 rounded-lg w-full max-w-3xl h-max-[90vh] shadow-xl cursor-default relative overflow-auto"
          >
            {/* BACKGROUND ICON */}
            <TiInputChecked className="text-white/5 rotate-12 text-[250px] absolute z-0 -top-12 -left-12" />
            {/* CONTENT START */}
            <div className="relative z-10">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                {watched.length > 0 ? <TiInputChecked /> : <GiWindsock />}
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Your Watched Movies
              </h3>
            </div>
            <div className="mt-8 mb-8">
              {watched.length > 0 ? (
                <WatchedList
                  watched={watched}
                  onDeleteWatched={onDeleteWatched}
                  onSelectMovie={onSelectMovie}
                />
              ) : (
                <div className="text-center">😞 Your watched list is empty</div>
              )}
            </div>
            {/* FOOTER */}

            <ButtonClose clickAction={() => setWatchedModalOpen(false)} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WatchedListModal
