import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Player } from '../types/game';

interface PlayerSetupProps {
  players: Player[];
  onAddPlayer: (name: string) => void;
  onRemovePlayer: (id: number) => void;
  onStartGame: () => void;
}

export function PlayerSetup({ players, onAddPlayer, onRemovePlayer, onStartGame }: PlayerSetupProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length >= 2) {
      onAddPlayer(name.trim());
      setName('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg sm:text-xl font-bold text-center mb-4 text-[#00f5ff]">
        👥 Jugadores
      </h3>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre del jugador"
          minLength={2}
          className="flex-1 px-4 py-2.5 rounded-xl bg-[#252547] border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] focus:ring-1 focus:ring-[#00f5ff] transition-colors text-sm"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          disabled={name.trim().length < 2}
          className="px-4 py-2.5 rounded-xl bg-[#00f5ff] text-[#0f0f23] font-bold text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          + Agregar
        </motion.button>
      </form>

      <div className="space-y-2 max-h-60 overflow-y-auto">
        {players.map((player, i) => (
          <motion.div
            key={player.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex items-center justify-between p-3 rounded-xl bg-[#252547] border border-gray-700"
          >
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm font-bold">#{i + 1}</span>
              <span className="font-bold text-white text-sm sm:text-base">{player.name}</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onRemovePlayer(player.id)}
              className="text-[#ff3131] hover:text-[#ff6b6b] font-bold text-lg px-2"
            >
              ×
            </motion.button>
          </motion.div>
        ))}
      </div>

      {players.length === 0 && (
        <p className="text-gray-500 text-center text-sm mt-4">
          Agrega al menos 2 jugadores para comenzar
        </p>
      )}

      <motion.button
        whileHover={{ scale: players.length >= 2 ? 1.02 : 1 }}
        whileTap={{ scale: players.length >= 2 ? 0.98 : 1 }}
        onClick={onStartGame}
        disabled={players.length < 2}
        className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-[#00f5ff] to-[#ff00ff] text-white font-bold text-lg shadow-lg shadow-[#00f5ff]/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
      >
        🎮 Comenzar Juego ({players.length} jugadores)
      </motion.button>
    </div>
  );
}
