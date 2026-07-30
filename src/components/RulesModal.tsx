
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const rules = [
  'Agrega los jugadores (mínimo 2)',
  'Personaliza las opciones de la ruleta o usa las predeterminadas',
  'El sistema elige al primer jugador automáticamente',
  'Gira la ruleta y suma los shots que salgan',
  'Sigue el orden secuencial de los jugadores',
  'Al llegar a 10 shots, ¡eres el más borracho de todos!',
  '¡El que más toma, pierde!',
];

export function RulesModal({ isOpen, onClose }: RulesModalProps) {
  const { value: dontShowAgain, setValue: setDontShowAgain } = useLocalStorage(
    'ruleta-hide-rules',
    false
  );

  const handleClose = () => {
    if (dontShowAgain) {
      setDontShowAgain(true);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-gradient-to-b from-[#1a1a3e] to-[#252547] rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-[#00f5ff]/30 shadow-2xl shadow-[#00f5ff]/10"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6">
              <span className="bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] bg-clip-text text-transparent">
                🎰 REGLAS DEL JUEGO 🎰
              </span>
            </h2>

            <ol className="space-y-3 mb-6">
              {rules.map((rule, i) => (
                <motion.li
                  key={i}
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 text-gray-200"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#00f5ff]/20 text-[#00f5ff] font-bold text-sm flex items-center justify-center border border-[#00f5ff]/40">
                    {i + 1}
                  </span>
                  <span className="text-sm sm:text-base">{rule}</span>
                </motion.li>
              ))}
            </ol>

            <label className="flex items-center gap-2 text-gray-400 text-sm mb-4 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-4 h-4 rounded accent-[#00f5ff]"
              />
              No mostrar de nuevo
            </label>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] text-white font-bold text-lg shadow-lg shadow-[#00f5ff]/30 hover:shadow-[#00f5ff]/50 transition-shadow"
            >
              ¡ENTENDIDO!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
