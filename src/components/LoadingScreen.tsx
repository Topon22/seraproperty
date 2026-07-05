"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"logo-in" | "loading" | "exit">("logo-in");

  // Animate progress bar
  useEffect(() => {
    if (phase !== "loading") return;

    const duration = 1800; // total loading time
    const interval = 16;
    const step = 100 / (duration / interval);
    let current = 0;

    const timer = setInterval(() => {
      current += step + (Math.random() * step * 0.5);
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        // Small delay after 100% then exit
        setTimeout(() => setPhase("exit"), 300);
      }
      setProgress(Math.min(current, 100));
    }, interval);

    return () => clearInterval(timer);
  }, [phase]);

  // Trigger loading phase after logo animates in
  useEffect(() => {
    const timer = setTimeout(() => setPhase("loading"), 600);
    return () => clearTimeout(timer);
  }, []);

  // Fire onComplete when exit animation finishes
  useEffect(() => {
    if (phase === "exit") {
      const timer = setTimeout(onComplete, 600);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit-done" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
        >
          {/* Subtle background pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.03]"
              style={{
                background:
                  "radial-gradient(circle, #3498db 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -top-40 -right-40 w-80 h-80 rounded-full opacity-[0.04]"
              style={{
                background:
                  "radial-gradient(circle, #3498db 0%, transparent 70%)",
              }}
            />
            <div
              className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-[0.03]"
              style={{
                background:
                  "radial-gradient(circle, #2980b9 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Logo Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <motion.img
              src="/images/logo.png"
              alt="Sera Property"
              className="w-48 sm:w-56 h-auto"
              initial={{ filter: "blur(8px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: "easeOut",
              }}
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="relative z-10 text-gray-400 text-sm mt-4 tracking-wide"
          >
            Renting Made Simple
          </motion.p>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.7 }}
            className="relative z-10 w-48 sm:w-56 mt-8"
          >
            {/* Track */}
            <div className="h-[3px] bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, #3498db, #5dade2)",
                }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Percentage */}
            <div className="flex justify-between mt-2.5">
              <span className="text-[11px] text-gray-300 font-medium">
                Loading
              </span>
              <motion.span
                key={Math.floor(progress)}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="text-[11px] text-gray-300 font-medium tabular-nums"
              >
                {Math.floor(progress)}%
              </motion.span>
            </div>
          </motion.div>

          {/* Decorative dots animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            className="relative z-10 flex items-center gap-1.5 mt-8"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-sera/40"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}