export interface Player {
  id: number;
  name: string;
}

export interface RouletteOption {
  id: number;
  text: string;
  color: string;
  shots: number;
  isCustom: boolean;
}

export interface GameRound {
  playerId: number;
  playerName: string;
  optionText: string;
  shotsAdded: number;
  timestamp: number;
}

export interface GameState {
  players: Player[];
  options: RouletteOption[];
  currentPlayerIndex: number;
  scores: Record<number, number>;
  gameStarted: boolean;
  isSpinning: boolean;
  history: GameRound[];
  selectedOption: RouletteOption | null;
}

export type Screen = 'setup' | 'game';
