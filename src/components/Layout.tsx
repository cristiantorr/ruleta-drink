import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f23] via-[#1a1a3e] to-[#0f0f23] overflow-x-hidden">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="py-4 px-6 text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-[#00f5ff] via-[#ff00ff] to-[#ffe600] bg-clip-text text-transparent drop-shadow-lg">
            🎰 RULETA EBRIOS 🎰
          </span>
        </h1>
        <p className="text-gray-400 text-sm mt-1">El juego más borracho del mundo</p>
      </motion.header>
      <main className="container mx-auto px-4 pb-8">{children}</main>
    </div>
  );
}
