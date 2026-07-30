import { motion, AnimatePresence } from 'framer-motion';
import type { GameRound } from '../types/game';

interface HistoryModalProps {
  isOpen: boolean;
  history: GameRound[];
  onClose: () => void;
}

export function HistoryModal({ isOpen, history, onClose }: HistoryModalProps) {
  const reversedHistory = [...history].reverse();

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
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-gradient-to-b from-[#1a1a3e] to-[#252547] rounded-2xl p-6 max-w-md w-full max-h-[80vh] border border-[#ff00ff]/30 shadow-2xl shadow-[#ff00ff]/10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-extrabold text-center mb-4">
              <span className="bg-gradient-to-r from-[#ff00ff] to-[#00f5ff] bg-clip-text text-transparent">
                📜 Historial de Rondas
              </span>
            </h2>

            {reversedHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay rondas registradas aún</p>
            ) : (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                {reversedHistory.map((round, i) => (
                  <motion.div
                    key={round.timestamp + i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#1a1a3e] border border-gray-700"
                  >
                    <span className="text-gray-500 text-xs font-mono w-8 text-center">
                      #{history.length - i}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white text-sm truncate">{round.playerName}</p>
                      <p className="text-gray-400 text-xs truncate">{round.optionText}</p>
                    </div>
                    <span className={`font-extrabold text-sm ${
                      round.shotsAdded > 0 ? 'text-[#ff3131]' : 'text-gray-500'
                    }`}>
                      {round.shotsAdded > 0 ? `+${round.shotsAdded}` : '—'}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="w-full mt-4 py-3 rounded-xl bg-[#252547] border border-gray-600 text-white font-bold hover:border-[#00f5ff] transition-colors"
            >
              Cerrar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
