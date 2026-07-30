import { motion, AnimatePresence } from 'framer-motion';
import type { RouletteOption } from '../types/game';

interface DrunkAlertProps {
  isOpen: boolean;
  playerName: string;
  option: RouletteOption | null;
  onClose: () => void;
}

export function DrunkAlert({ isOpen, playerName, option, onClose }: DrunkAlertProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 10 }}
            transition={{ type: 'spring', damping: 15, stiffness: 300 }}
            className="bg-gradient-to-b from-[#ff3131] to-[#1a1a3e] rounded-2xl p-6 sm:p-8 max-w-md w-full border-2 border-[#ff3131] shadow-2xl shadow-[#ff3131]/30 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              animate={{ rotate: [0, -5, 5, -5, 5, 0] }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="text-6xl mb-4"
            >
              🥴
            </motion.div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              ¡{playerName}!
            </h2>
            <p className="text-lg sm:text-xl text-[#ffe600] font-bold mb-4">
              ¡Eres el más borracho de todos!
            </p>

            {option && (
              <p className="text-gray-300 text-sm mb-6">
                Último shot: <span className="text-[#00f5ff]">{option.text}</span>
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-8 py-3 rounded-xl bg-white text-[#ff3131] font-bold text-lg shadow-lg hover:bg-gray-100 transition-colors"
            >
              ¡Seguir Jugando!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
