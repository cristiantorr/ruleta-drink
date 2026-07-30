import { motion } from 'framer-motion';
import type { Player } from '../types/game';

interface GameControlsProps {
  currentPlayer: Player | undefined;
  isSpinning: boolean;
  onSpin: () => void;
  onReset: () => void;
  onResetAll: () => void;
  onShowHistory: () => void;
  onShowRules: () => void;
}

export function GameControls({
  currentPlayer,
  isSpinning,
  onSpin,
  onReset,
  onResetAll,
  onShowHistory,
  onShowRules,
}: GameControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      {currentPlayer && (
        <motion.div
          key={currentPlayer.id}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <p className="text-gray-400 text-sm">Turno de</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#00f5ff]">
            {currentPlayer.name}
          </p>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: isSpinning ? 1 : 1.05 }}
        whileTap={{ scale: isSpinning ? 1 : 0.95 }}
        onClick={onSpin}
        disabled={isSpinning}
        className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#ff3131] to-[#ff8c00] text-white font-extrabold text-xl shadow-lg shadow-[#ff3131]/30 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSpinning ? (
          <span className="flex items-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              🎰
            </motion.span>
            Girando...
          </span>
        ) : (
          '🎰 Girar Ruleta'
        )}
      </motion.button>

      <div className="flex gap-3 flex-wrap justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShowRules}
          className="px-4 py-2 rounded-xl bg-[#252547] border border-gray-600 text-gray-300 text-sm hover:border-[#00f5ff] hover:text-[#00f5ff] transition-colors"
        >
          📋 Reglas
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onShowHistory}
          className="px-4 py-2 rounded-xl bg-[#252547] border border-gray-600 text-gray-300 text-sm hover:border-[#ff00ff] hover:text-[#ff00ff] transition-colors"
        >
          📜 Historial
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="px-4 py-2 rounded-xl bg-[#252547] border border-gray-600 text-gray-300 text-sm hover:border-[#ffe600] hover:text-[#ffe600] transition-colors"
        >
          🔄 Nueva Partida
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onResetAll}
          className="px-4 py-2 rounded-xl bg-[#252547] border border-gray-600 text-gray-300 text-sm hover:border-[#ff3131] hover:text-[#ff3131] transition-colors"
        >
          🗑️ Reset Total
        </motion.button>
      </div>
    </div>
  );
}
