import { motion, AnimatePresence } from 'framer-motion';
import type { RouletteOption } from '../types/game';

export type DrunkLevel = 'drunk' | 'noMore' | 'vomit';

interface DrunkAlertConfig {
  emoji: string;
  title: string;
  subtitle: string;
  borderColor: string;
  bgGradient: string;
  shadowColor: string;
}

const DRUNK_CONFIGS: Record<DrunkLevel, DrunkAlertConfig> = {
  drunk: {
    emoji: '🥴',
    title: '¡Eres el más borracho de todos!',
    subtitle: '¡Ya llevas demasiados shots!',
    borderColor: '#ff3131',
    bgGradient: 'from-[#ff3131] to-[#1a1a3e]',
    shadowColor: 'shadow-[#ff3131]/30',
  },
  noMore: {
    emoji: '🚫🍺',
    title: '¡No le den más trago!',
    subtitle: '¡Se está pasando de la raya!',
    borderColor: '#ff8c00',
    bgGradient: 'from-[#ff8c00] to-[#1a1a3e]',
    shadowColor: 'shadow-[#ff8c00]/30',
  },
  vomit: {
    emoji: '🤮',
    title: '¡Se va a vomitar!',
    subtitle: '¡Alguien llame a un taxi!',
    borderColor: '#39ff14',
    bgGradient: 'from-[#39ff14] to-[#1a1a3e]',
    shadowColor: 'shadow-[#39ff14]/30',
  },
};

interface DrunkAlertProps {
  isOpen: boolean;
  playerName: string;
  option: RouletteOption | null;
  level: DrunkLevel;
  onClose: () => void;
}

export function DrunkAlert({ isOpen, playerName, option, level, onClose }: DrunkAlertProps) {
  const config = DRUNK_CONFIGS[level];

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
            className={`bg-gradient-to-b ${config.bgGradient} rounded-2xl p-6 sm:p-8 max-w-md w-full border-2 border-${config.borderColor} shadow-2xl ${config.shadowColor} text-center overflow-hidden relative`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Confetti / Particles */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  scale: 0,
                  x: 0,
                  y: 0,
                }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  x: (Math.random() - 0.5) * 300,
                  y: (Math.random() - 0.5) * 300 - 100,
                  rotate: Math.random() * 720,
                }}
                transition={{ 
                  duration: 1.5 + Math.random() * 1,
                  delay: 0.1 + Math.random() * 0.3,
                  ease: "easeOut"
                }}
                className="absolute text-2xl pointer-events-none"
                style={{ left: '50%', top: '50%' }}
              >
                {level === 'drunk' ? '⭐' : level === 'noMore' ? '🏆' : '🎖️'}
              </motion.div>
            ))}

            {/* Trophy / Award Animation */}
            <motion.div
              initial={{ scale: 0, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ 
                type: 'spring', 
                damping: 10, 
                stiffness: 200,
                delay: 0.2 
              }}
              className="mb-4 relative z-10"
            >
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                className="text-7xl sm:text-8xl"
              >
                {config.emoji}
              </motion.div>
              
              {/* Glow effect behind emoji */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center -z-10"
              >
                <div className={`w-32 h-32 rounded-full bg-${config.borderColor}/30 blur-xl`} />
              </motion.div>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
              className={`inline-block px-4 py-1 rounded-full bg-${config.borderColor}/20 border border-${config.borderColor}/50 mb-4 relative z-10`}
            >
              <span className={`text-${config.borderColor} font-bold text-sm`}>
                {level === 'drunk' ? '🥇 NIVEL 1' : level === 'noMore' ? '🥈 NIVEL 2' : '🥉 NIVEL 3'}
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl font-extrabold text-white mb-2 relative z-10"
            >
              ¡{playerName}!
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-[#ffe600] font-bold mb-2 relative z-10"
            >
              {config.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-300 text-sm mb-4 relative z-10"
            >
              {config.subtitle}
            </motion.p>

            {option && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-300 text-sm mb-6 relative z-10"
              >
                Último shot: <span className="text-[#00f5ff]">{option.text}</span>
              </motion.p>
            )}

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className={`px-8 py-3 rounded-xl bg-white text-${config.borderColor} font-bold text-lg shadow-lg hover:bg-gray-100 transition-colors relative z-10`}
            >
              {level === 'vomit' ? '💀 Ayuda...' : '¡Seguir Jugando!'}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
