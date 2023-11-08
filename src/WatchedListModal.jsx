import { AnimatePresence, motion } from 'framer-motion'
import { TiInputChecked } from 'react-icons/ti'
import WatchedList from './WatchedList'

const WatchedListModal = ({
  watchedModalOpen,
  setWatchedModalOpen,
  watched,
  onDeleteWatched,
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
                <TiInputChecked />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Your Watched Movies
              </h3>
            </div>
            <div className="">
              <WatchedList
                watched={watched}
                onDeleteWatched={onDeleteWatched}
              />
            </div>
            {/* FOOTER */}
            <div className="flex gap-2 mt-16">
              <button
                onClick={() => setWatchedModalOpen(false)}
                className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
              >
                Nah, go back
              </button>
              <button
                onClick={() => setWatchedModalOpen(false)}
                className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
              >
                Understood!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default WatchedListModal
