import { motion, AnimatePresence } from 'framer-motion';
import type { RouletteOption } from '../types/game';
import { OptionsEditor } from './OptionsEditor';

interface OptionsModalProps {
  isOpen: boolean;
  options: RouletteOption[];
  onAddOption: (text: string) => void;
  onRemoveOption: (id: number) => void;
  onClose: () => void;
}

export function OptionsModal({ isOpen, options, onAddOption, onRemoveOption, onClose }: OptionsModalProps) {
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
            className="bg-gradient-to-b from-[#1a1a3e] to-[#252547] rounded-2xl p-6 max-w-md w-full max-h-[80vh] border border-[#ff00ff]/30 shadow-2xl shadow-[#ff00ff]/10 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <OptionsEditor
              options={options}
              onAddOption={onAddOption}
              onRemoveOption={onRemoveOption}
            />

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
