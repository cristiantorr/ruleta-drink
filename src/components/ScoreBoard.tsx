import { motion } from "framer-motion";
import type { Player } from "../types/game";
import { getSortedPlayers } from "../utils/gameLogic";

interface ScoreBoardProps {
  players: Player[];
  scores: Record<number, number>;
  currentPlayerIndex: number;
}

export function ScoreBoard({
  players,
  scores,
  currentPlayerIndex,
}: ScoreBoardProps) {
  const sorted = getSortedPlayers(players, scores);

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg sm:text-xl font-bold text-center mb-4 text-[#00f5ff]">
        📊 Tabla de Posiciones
      </h3>
      <div className="space-y-2">
        {sorted.map((entry, i) => {
          const isCurrent = players[currentPlayerIndex]?.id === entry.player.id;
          const isDrunk = entry.shots >= 10;

          return (
            <motion.div
              key={entry.player.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                isDrunk
                  ? "bg-gradient-to-r from-[#ff3131]/30 to-[#ff8c00]/30 border border-[#ff3131]/50"
                  : isCurrent
                    ? "bg-[#00f5ff]/10 border border-[#00f5ff]/30"
                    : "bg-[#252547] border border-gray-700"
              }`}
            >
              <span className="text-lg font-bold w-8 text-center">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-bold text-sm sm:text-base truncate ${
                      isCurrent ? "text-[#00f5ff]" : "text-white"
                    }`}
                  >
                    {entry.player.name}
                  </span>
                  {isCurrent && (
                    <span className="text-xs bg-[#00f5ff]/20 text-[#00f5ff] px-2 py-0.5 rounded-full">
                      Turno
                    </span>
                  )}
                  {isDrunk && (
                    <span className="text-xs bg-[#ff3131]/20 text-[#ff3131] px-2 py-0.5 rounded-full">
                      🥴 Borracho
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: Math.min(entry.shots, 15) }).map(
                    (_, j) => (
                      <span key={j} className="text-xs">
                        {entry.shots >= 10
                          ? "🍷"
                          : entry.shots >= 5
                            ? "🍺"
                            : "🍺"}
                      </span>
                    ),
                  )}
                </div>
              </div>
              <span
                className={`text-xl font-extrabold ${
                  isDrunk ? "text-[#ff3131]" : "text-[#ffe600]"
                }`}
              >
                {entry.shots}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
