import type { Player, RouletteOption } from '../types/game';

export function getRandomOption(options: RouletteOption[]): RouletteOption {
  const idx = Math.floor(Math.random() * options.length);
  return options[idx];
}

export function getNextPlayerIndex(
  currentIndex: number,
  playersCount: number
): number {
  return (currentIndex + 1) % playersCount;
}

export function getWinnerName(scores: Record<number, number>, players: Player[]): string {
  let maxShots = 0;
  let winnerId = -1;

  for (const [idStr, shots] of Object.entries(scores)) {
    const id = Number(idStr);
    if (shots > maxShots) {
      maxShots = shots;
      winnerId = id;
    }
  }

  const winner = players.find((p) => p.id === winnerId);
  return winner ? winner.name : 'Nadie';
}

export function getSortedPlayers(
  players: Player[],
  scores: Record<number, number>
): { player: Player; shots: number }[] {
  return players
    .map((p) => ({ player: p, shots: scores[p.id] || 0 }))
    .sort((a, b) => b.shots - a.shots);
}
