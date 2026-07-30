import { useState, useCallback, useEffect, useRef } from 'react';
import type { Player, RouletteOption, GameState, GameRound } from '../types/game';
import { DEFAULT_OPTIONS } from '../constants/defaultOptions';
import { getNextPlayerIndex } from '../utils/gameLogic';
import { useLocalStorage } from './useLocalStorage';

const initialGameState: GameState = {
  players: [],
  options: DEFAULT_OPTIONS,
  currentPlayerIndex: 0,
  scores: {},
  gameStarted: false,
  isSpinning: false,
  history: [],
  selectedOption: null,
};

export function useGameState() {
  const { value: savedState, setValue: saveState } = useLocalStorage<GameState | null>(
    'ruleta-game-state',
    null
  );

  const [state, setState] = useState<GameState>(savedState || initialGameState);
  const resolveSpinRef = useRef<((option: RouletteOption) => void) | null>(null);

  useEffect(() => {
    if (state.gameStarted) {
      saveState(state);
    }
  }, [state, saveState]);

  const addPlayer = useCallback((name: string) => {
    setState((prev) => {
      const newId = prev.players.length > 0
        ? Math.max(...prev.players.map((p) => p.id)) + 1
        : 1;
      const newPlayer: Player = { id: newId, name };
      return { ...prev, players: [...prev.players, newPlayer] };
    });
  }, []);

  const removePlayer = useCallback((id: number) => {
    setState((prev) => ({
      ...prev,
      players: prev.players.filter((p) => p.id !== id),
    }));
  }, []);

  const setOptions = useCallback((options: RouletteOption[]) => {
    setState((prev) => ({ ...prev, options }));
  }, []);

  const addOption = useCallback((text: string) => {
    setState((prev) => {
      const newId = prev.options.length > 0
        ? Math.max(...prev.options.map((o) => o.id)) + 1
        : 1;
      const colors = ['#ff3131', '#ff8c00', '#ffe600', '#39ff14', '#00bfff', '#bf00ff', '#ff69b4', '#00f5ff'];
      const newOption: RouletteOption = {
        id: newId,
        text,
        color: colors[newId % colors.length],
        shots: 1,
        isCustom: true,
      };
      return { ...prev, options: [...prev.options, newOption] };
    });
  }, []);

  const removeOption = useCallback((id: number) => {
    setState((prev) => ({
      ...prev,
      options: prev.options.filter((o) => o.id !== id),
    }));
  }, []);

  const startGame = useCallback(() => {
    setState((prev) => ({
      ...prev,
      gameStarted: true,
      currentPlayerIndex: 0,
      scores: Object.fromEntries(prev.players.map((p) => [p.id, 0])),
      history: [],
      selectedOption: null,
    }));
  }, []);

  const selectRandomPlayer = useCallback(() => {
    setState((prev) => {
      const idx = Math.floor(Math.random() * prev.players.length);
      return { ...prev, currentPlayerIndex: idx };
    });
  }, []);

  const handleSpinEnd = useCallback((option: RouletteOption) => {
    const resolve = resolveSpinRef.current;
    resolveSpinRef.current = null;

    setState((prev) => {
      const currentPlayer = prev.players[prev.currentPlayerIndex];
      const newScores = { ...prev.scores };
      newScores[currentPlayer.id] = (newScores[currentPlayer.id] || 0) + option.shots;

      const round: GameRound = {
        playerId: currentPlayer.id,
        playerName: currentPlayer.name,
        optionText: option.text,
        shotsAdded: option.shots,
        timestamp: Date.now(),
      };

      const nextIndex = getNextPlayerIndex(
        prev.currentPlayerIndex,
        prev.players.length
      );

      return {
        ...prev,
        isSpinning: false,
        scores: newScores,
        history: [...prev.history, round],
        currentPlayerIndex: nextIndex,
        selectedOption: option,
      };
    });

    if (resolve) {
      resolve(option);
    }
  }, []);

  const spinRoulette = useCallback((): Promise<RouletteOption> => {
    return new Promise((resolve) => {
      resolveSpinRef.current = resolve;
      setState((prev) => ({ ...prev, isSpinning: true, selectedOption: null }));
    });
  }, []);

  const resetGame = useCallback(() => {
    setState((prev) => ({
      ...initialGameState,
      players: prev.players,
      options: prev.options,
    }));
  }, []);

  const resetAll = useCallback(() => {
    setState(initialGameState);
    saveState(null);
  }, [saveState]);

  const clearSavedState = useCallback(() => {
    saveState(null);
  }, [saveState]);

  return {
    state,
    addPlayer,
    removePlayer,
    setOptions,
    addOption,
    removeOption,
    startGame,
    selectRandomPlayer,
    spinRoulette,
    handleSpinEnd,
    resetGame,
    resetAll,
    clearSavedState,
  };
}
