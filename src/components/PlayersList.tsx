import { motion } from 'framer-motion';
import type { Player } from '../types/game';

interface PlayersListProps {
  players: Player[];
  currentPlayerIndex: number;
  scores: Record<number, number>;
}

export function PlayersList({ players, currentPlayerIndex, scores }: PlayersListProps) {
  return (
    <div className="hidden lg:flex flex-col gap-2 items-center justify-center w-32 xl:w-40">
      <h3 className="text-sm font-bold text-[#00f5ff] mb-2">Participantes</h3>
      {players.map((player, i) => {
        const isCurrent = i === currentPlayerIndex;
        const shots = scores[player.id] || 0;
        
        return (
          <motion.div
            key={player.id}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`bg-[#252547] border rounded-lg px-3 py-2 text-center shadow-lg w-full ${
              isCurrent ? 'border-[#00f5ff]' : 'border-gray-700'
            }`}
          >
            <p className={`text-xs sm:text-sm font-bold leading-tight ${
              isCurrent ? 'text-[#00f5ff]' : 'text-white'
            }`}>
              {player.name}
            </p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <span className="text-[10px] text-gray-400">
                {shots} shot{shots !== 1 ? 's' : ''}
              </span>
              {shots >= 10 && <span className="text-xs">🥴</span>}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
