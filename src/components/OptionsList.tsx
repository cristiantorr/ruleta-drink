import { motion } from 'framer-motion';
import type { RouletteOption } from '../types/game';

interface OptionsListProps {
  options: RouletteOption[];
}

export function OptionsList({ options }: OptionsListProps) {
  return (
    <div className="hidden lg:flex flex-col items-center w-28 xl:w-36 max-h-[500px]">
      <h3 className="text-xs font-bold text-[#00f5ff] mb-2 sticky top-0 bg-[#0a0a23] py-1 z-10">
        Opciones ({options.length})
      </h3>
      <div className="flex flex-col gap-1 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
        {options.map((option, i) => (
          <motion.div
            key={option.id}
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            className="flex items-center gap-2 bg-[#252547] border border-gray-700 rounded-lg px-2 py-1.5 shadow-lg"
          >
            <div 
              className="w-2.5 h-2.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: option.color }}
            />
            <div className="min-w-0 flex-1">
              <p className="text-[9px] font-bold text-white leading-tight truncate">
                {option.text}
              </p>
              <p className="text-[8px] text-gray-400">
                {option.shots} shot{option.shots !== 1 ? 's' : ''}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
