import { motion } from 'framer-motion';
import { CROWD_PHRASES } from '../constants/crowdPhrases';

export function CrowdCards() {
  const leftCards = CROWD_PHRASES.slice(0, 6);
  const rightCards = CROWD_PHRASES.slice(6);

  return (
    <>
      {/* Left crowd */}
      <div className="hidden lg:flex flex-col gap-2 items-center justify-center w-32 xl:w-40">
        {leftCards.map((phrase, i) => (
          <motion.div
            key={i}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="bg-[#252547] border border-gray-700 rounded-lg px-3 py-2 text-center shadow-lg w-full"
          >
            <span className="text-lg">{phrase.emoji}</span>
            <p className="text-[10px] sm:text-xs font-bold text-white leading-tight mt-1">
              {phrase.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Right crowd */}
      <div className="hidden lg:flex flex-col gap-2 items-center justify-center w-32 xl:w-40">
        {rightCards.map((phrase, i) => (
          <motion.div
            key={i}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.15 + 0.5, duration: 0.5 }}
            className="bg-[#252547] border border-gray-700 rounded-lg px-3 py-2 text-center shadow-lg w-full"
          >
            <span className="text-lg">{phrase.emoji}</span>
            <p className="text-[10px] sm:text-xs font-bold text-white leading-tight mt-1">
              {phrase.text}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
}
