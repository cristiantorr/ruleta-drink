import { useCallback, useRef } from 'react';
import {
  playSpinSound,
  playSelectSound,
  playAlertSound,
  playCelebrateSound,
  playResetSound,
  playClickSound,
} from '../utils/audioSynth';

export function useSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const spin = useCallback(() => playSpinSound(), []);
  const select = useCallback(() => playSelectSound(), []);
  const alert = useCallback(() => playAlertSound(), []);
  const celebrate = useCallback(() => playCelebrateSound(), []);
  const reset = useCallback(() => playResetSound(), []);
  const click = useCallback(() => playClickSound(), []);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  }, []);

  return { spin, select, alert, celebrate, reset, click, initAudio };
}
