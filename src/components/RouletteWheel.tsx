import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { RouletteOption } from '../types/game';

interface RouletteWheelProps {
  options: RouletteOption[];
  isSpinning: boolean;
  selectedOption: RouletteOption | null;
  onSpinEnd?: (option: RouletteOption) => void;
}

export function RouletteWheel({ options, isSpinning, selectedOption, onSpinEnd }: RouletteWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const pendingRotationRef = useRef<number | null>(null);
  const optionsRef = useRef(options);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const getOptionAtPointer = useCallback((finalRotation: number, opts: RouletteOption[]): RouletteOption => {
    if (opts.length === 0) return opts[0];
    const sliceAngle = 360 / opts.length;
    const normalizedRotation = finalRotation % 360;
    const angleAtPointer = (360 - normalizedRotation + 360) % 360;
    const index = Math.floor(angleAtPointer / sliceAngle) % opts.length;
    return opts[index];
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 400;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 10;

    ctx.clearRect(0, 0, size, size);

    const totalOptions = options.length;
    const sliceAngle = (2 * Math.PI) / totalOptions;

    options.forEach((option, i) => {
      const startAngle = i * sliceAngle - Math.PI / 2;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = option.color;
      ctx.fill();
      ctx.strokeStyle = '#1a1a3e';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(startAngle + sliceAngle / 2);
      
      const textColor = option.color === '#1a1a1a' || option.color === '#808080' ? '#ffffff' : '#000000';
      ctx.fillStyle = textColor;
      ctx.font = 'bold 10px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const maxWidth = radius * 0.55;
      const text = option.text;
      const words = text.split(' ');
      let lines: string[] = [];
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine ? currentLine + ' ' + word : word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        lines.push(currentLine);
      }
      
      const lineHeight = 12;
      const startY = -((lines.length - 1) * lineHeight) / 2;
      
      lines.forEach((line, lineIndex) => {
        ctx.fillText(line, radius * 0.55, startY + lineIndex * lineHeight);
      });
      
      ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(cx, cy, 35, 0, 2 * Math.PI);
    ctx.fillStyle = '#1a1a3e';
    ctx.fill();
    ctx.strokeStyle = '#00f5ff';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = '#00f5ff';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎲', cx, cy);
  }, [options]);

  useEffect(() => {
    if (isSpinning) {
      const spins = 5 + Math.floor(Math.random() * 3);
      const extraDegrees = Math.random() * 360;
      const newRotation = rotation + spins * 360 + extraDegrees;
      pendingRotationRef.current = newRotation;
      setRotation(newRotation);
    }
  }, [isSpinning]);

  const handleAnimationComplete = useCallback(() => {
    if (pendingRotationRef.current !== null && onSpinEnd) {
      const finalRotation = pendingRotationRef.current;
      pendingRotationRef.current = null;
      const winningOption = getOptionAtPointer(finalRotation, optionsRef.current);
      onSpinEnd(winningOption);
    }
  }, [onSpinEnd, getOptionAtPointer]);

  return (
    <div className="relative flex items-center justify-center">
      <div className="absolute w-[350px] h-[350px] sm:w-[420px] sm:h-[420px] rounded-full bg-[#00f5ff]/10 blur-3xl animate-pulse" />

      <div className="absolute top-0 z-10">
        <div
          className="w-0 h-0"
          style={{
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: '24px solid #ff3131',
            filter: 'drop-shadow(0 0 6px #ff3131)',
          }}
        />
      </div>

      <motion.div
        animate={{ rotate: rotation }}
        transition={{
          duration: 5,
          ease: [0.17, 0.67, 0.12, 0.99],
        }}
        onAnimationComplete={handleAnimationComplete}
        className="relative z-[5]"
      >
        <canvas
          ref={canvasRef}
          className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]"
          style={{ filter: 'drop-shadow(0 0 20px rgba(0, 245, 255, 0.3))' }}
        />
      </motion.div>

      {selectedOption && !isSpinning && (
        <motion.div
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="absolute -bottom-16 sm:-bottom-20 z-20 bg-[#252547] border-2 border-[#00f5ff] rounded-xl px-6 py-3 shadow-lg shadow-[#00f5ff]/20"
        >
          <p className="text-[#00f5ff] font-bold text-sm sm:text-base text-center">
            {selectedOption.text}
          </p>
          {selectedOption.shots > 0 && (
            <p className="text-[#ff3131] font-extrabold text-lg text-center">
              {selectedOption.shots} shot{selectedOption.shots > 1 ? 's' : ''}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}
