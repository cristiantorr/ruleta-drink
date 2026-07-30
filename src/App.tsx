import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { useSound } from './hooks/useSound';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Layout } from './components/Layout';
import { RulesModal } from './components/RulesModal';
import { DrunkAlert } from './components/DrunkAlert';
import { HistoryModal } from './components/HistoryModal';
import { PlayerSetup } from './components/PlayerSetup';
import { OptionsEditor } from './components/OptionsEditor';
import { RouletteWheel } from './components/RouletteWheel';
import { ScoreBoard } from './components/ScoreBoard';
import { GameControls } from './components/GameControls';
import { OptionsList } from './components/OptionsList';
import { PlayersList } from './components/PlayersList';

function App() {
  const { value: hideRules } = useLocalStorage('ruleta-hide-rules', false);
  const [showRules, setShowRules] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showDrunkAlert, setShowDrunkAlert] = useState(false);
  const [drunkPlayerName, setDrunkPlayerName] = useState('');
  const [firstTurnDone, setFirstTurnDone] = useState(false);

  const {
    state,
    addPlayer,
    removePlayer,
    addOption,
    removeOption,
    startGame,
    selectRandomPlayer,
    spinRoulette,
    handleSpinEnd,
    resetGame,
    resetAll,
    clearSavedState,
  } = useGameState();

  const sound = useSound();

  useEffect(() => {
    if (!hideRules) {
      setShowRules(true);
    }
  }, []);

  const handleStartGame = useCallback(() => {
    sound.initAudio();
    sound.click();
    startGame();
    setFirstTurnDone(false);
  }, [startGame, sound]);

  useEffect(() => {
    if (state.gameStarted && !firstTurnDone && !state.isSpinning) {
      const timer = setTimeout(() => {
        selectRandomPlayer();
        setFirstTurnDone(true);
        sound.select();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [state.gameStarted, firstTurnDone, state.isSpinning, selectRandomPlayer, sound]);

  const handleSpin = useCallback(async () => {
    sound.spin();
    const option = await spinRoulette();
    sound.select();

    const currentIdx = (state.currentPlayerIndex - 1 + state.players.length) % state.players.length;
    const currentPlayer = state.players[currentIdx];

    if (currentPlayer) {
      const currentScore = state.scores[currentPlayer.id] || 0;
      if (currentScore + option.shots >= 10) {
        setTimeout(() => {
          sound.alert();
          setDrunkPlayerName(currentPlayer.name);
          setShowDrunkAlert(true);
        }, 500);
      }
    }
  }, [spinRoulette, sound, state]);

  const handleReset = useCallback(() => {
    sound.reset();
    resetGame();
    setFirstTurnDone(false);
  }, [resetGame, sound]);

  const handleResetAll = useCallback(() => {
    sound.reset();
    resetAll();
    clearSavedState();
    setFirstTurnDone(false);
  }, [resetAll, clearSavedState, sound]);

  return (
    <Layout>
      <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
      <HistoryModal
        isOpen={showHistory}
        history={state.history}
        onClose={() => setShowHistory(false)}
      />
      <DrunkAlert
        isOpen={showDrunkAlert}
        playerName={drunkPlayerName}
        option={state.selectedOption}
        onClose={() => setShowDrunkAlert(false)}
      />

      <AnimatePresence mode="wait">
        {!state.gameStarted ? (
          <motion.div
            key="setup"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8 py-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <PlayerSetup
                players={state.players}
                onAddPlayer={addPlayer}
                onRemovePlayer={removePlayer}
                onStartGame={handleStartGame}
              />
              <OptionsEditor
                options={state.options}
                onAddOption={addOption}
                onRemoveOption={removeOption}
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="game"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Stadium layout */}
            <div className="flex flex-col lg:flex-row items-start justify-center gap-6 lg:gap-8 py-4">
              <OptionsList options={state.options} />

              {/* Center: Roulette + Controls */}
              <div className="flex-1 flex flex-col items-center gap-12 sm:gap-16 min-w-0">
                <RouletteWheel
                  options={state.options}
                  isSpinning={state.isSpinning}
                  selectedOption={state.selectedOption}
                  onSpinEnd={handleSpinEnd}
                />

                <GameControls
                  currentPlayer={state.players[state.currentPlayerIndex]}
                  isSpinning={state.isSpinning}
                  onSpin={handleSpin}
                  onReset={handleReset}
                  onResetAll={handleResetAll}
                  onShowHistory={() => setShowHistory(true)}
                  onShowRules={() => setShowRules(true)}
                />

                <ScoreBoard
                  players={state.players}
                  scores={state.scores}
                  currentPlayerIndex={state.currentPlayerIndex}
                />
              </div>

              <PlayersList 
                players={state.players} 
                currentPlayerIndex={state.currentPlayerIndex}
                scores={state.scores}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default App;
