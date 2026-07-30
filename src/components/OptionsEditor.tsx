import { useState } from 'react';
import { motion } from 'framer-motion';
import type { RouletteOption } from '../types/game';

interface OptionsEditorProps {
  options: RouletteOption[];
  onAddOption: (text: string) => void;
  onRemoveOption: (id: number) => void;
}

export function OptionsEditor({ options, onAddOption, onRemoveOption }: OptionsEditorProps) {
  const [newOption, setNewOption] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newOption.trim().length >= 3) {
      onAddOption(newOption.trim());
      setNewOption('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg sm:text-xl font-bold text-center mb-4 text-[#ff00ff]">
        🎯 Opciones de la Ruleta ({options.length})
      </h3>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newOption}
          onChange={(e) => setNewOption(e.target.value)}
          placeholder="Nueva opción..."
          minLength={3}
          className="flex-1 px-4 py-2.5 rounded-xl bg-[#252547] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-[#ff00ff] focus:ring-1 focus:ring-[#ff00ff] transition-colors text-sm"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={newOption.trim().length < 3}
          className="px-4 py-2.5 rounded-xl bg-[#ff00ff] text-white font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          + Agregar
        </motion.button>
      </form>

      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {options.map((option) => (
          <motion.div
            key={option.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#252547] border border-gray-700 group"
          >
            <div
              className="w-4 h-4 rounded-full flex-shrink-0"
              style={{ backgroundColor: option.color }}
            />
            <span className="flex-1 text-white text-sm truncate">{option.text}</span>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemoveOption(option.id)}
              className="text-[#ff3131] hover:text-[#ff6b6b] font-bold text-lg px-1 opacity-50 group-hover:opacity-100 transition-opacity"
            >
              ×
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
