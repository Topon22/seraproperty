"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"intro" | "reveal" | "loading" | "done">("intro");
  const [progress, setProgress] = useState(0);
  const [taglineVisible, setTaglineVisible] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 3,
    }))
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Canvas particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particlesCanvas: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      fadeDir: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 50; i++) {
      particlesCanvas.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
        fadeDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesCanvas.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity += p.fadeDir * 0.002;

        if (p.opacity > 0.35) p.fadeDir = -1;
        if (p.opacity < 0.05) p.fadeDir = 1;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(93, 173, 226, ${p.opacity})`;
        ctx.fill();
      });

      // Draw connecting lines between close particles
      for (let i = 0; i < particlesCanvas.length; i++) {
        for (let j = i + 1; j < particlesCanvas.length; j++) {
          const dx = particlesCanvas[i].x - particlesCanvas[j].x;
          const dy = particlesCanvas[i].y - particlesCanvas[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particlesCanvas[i].x, particlesCanvas[i].y);
            ctx.lineTo(particlesCanvas[j].x, particlesCanvas[j].y);
            ctx.strokeStyle = `rgba(93, 173, 226, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Phase transitions
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 300);
    const t2 = setTimeout(() => {
      setPhase("loading");
      setTaglineVisible(true);
    }, 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Progress bar animation
  useEffect(() => {
    if (phase !== "loading") return;

    const duration = 2200;
    const interval = 16;
    const baseStep = 100 / (duration / interval);
    let current = 0;
    let lastTime = performance.now();

    const timer = setInterval(() => {
      const now = performance.now();
      const delta = now - lastTime;
      lastTime = now;

      // Eased progress — fast start, slow end
      const remaining = 100 - current;
      const speed = baseStep * (0.8 + (remaining / 100) * 0.8);
      current += speed + (Math.random() * baseStep * 0.3);

      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(() => setPhase("done"), 400);
      }
      setProgress(Math.min(current, 100));
    }, interval);

    return () => clearInterval(timer);
  }, [phase]);

  // Complete callback
  useEffect(() => {
    if (phase === "done") {
      const timer = setTimeout(onComplete, 700);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(6px)",
          }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, #0a1628 0%, #0f2035 30%, #132d4a 60%, #0d2137 100%)",
          }}
        >
          {/* Particle Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0"
          />

          {/* Ambient glow rings */}
          <div className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none">
            {/* Outer ring pulse */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{
                scale: phase === "loading" ? [1, 1.15, 1] : 1,
                opacity: phase === "intro" ? [0, 0.15] : 0.1,
              }}
              transition={{
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                opacity: { duration: 1.2, ease: "easeOut" },
              }}
              className="absolute w-[420px] h-[420px] md:w-[520px] md:h-[520px] rounded-full"
              style={{
                border: "1px solid rgba(93, 173, 226, 0.12)",
                boxShadow: "0 0 60px rgba(52, 152, 219, 0.05), inset 0 0 60px rgba(52, 152, 219, 0.03)",
              }}
            />

            {/* Middle ring */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{
                scale: phase === "loading" ? [1, 1.1, 1] : 1,
                opacity: phase === "intro" ? [0, 0.12] : 0.08,
              }}
              transition={{
                scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 },
                opacity: { duration: 1, delay: 0.2, ease: "easeOut" },
              }}
              className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full"
              style={{
                border: "1px solid rgba(93, 173, 226, 0.08)",
              }}
            />

            {/* Inner glow */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{
                scale: phase === "loading" ? [1, 1.05, 1] : 1,
                opacity: [0, 0.25],
              }}
              transition={{
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                opacity: { duration: 1.5, ease: "easeOut" },
              }}
              className="absolute w-[200px] h-[200px] md:w-[260px] md:h-[260px] rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(52, 152, 219, 0.15) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Logo Container */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.85 }}
              animate={{
                opacity: phase === "reveal" || phase === "loading" ? 1 : 0.4,
                y: 0,
                scale: phase === "reveal" || phase === "loading" ? 1 : 0.85,
              }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              {/* Logo glow behind */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === "loading" ? 0.6 : 0.3 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute inset-0 blur-3xl scale-150"
                style={{
                  background: "radial-gradient(circle, rgba(52, 152, 219, 0.2) 0%, transparent 70%)",
                }}
              />

              <motion.img
                src="/images/logo.png"
                alt="Sera Property"
                className="relative w-36 sm:w-44 md:w-52 h-auto drop-shadow-2xl"
                style={{
                  filter:
                    phase === "intro"
                      ? "blur(12px) brightness(0.6)"
                      : phase === "reveal"
                      ? "blur(0px) brightness(1)"
                      : "blur(0px) brightness(1.05)",
                }}
                animate={{
                  scale: phase === "loading" ? [1, 1.02, 1] : 1,
                }}
                transition={{
                  filter: { duration: 0.8, ease: "easeOut" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            </motion.div>

            {/* Animated line under logo */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: phase === "reveal" || phase === "loading" ? 1 : 0,
                opacity: phase === "reveal" || phase === "loading" ? 1 : 0,
              }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-24 sm:w-32 h-[1px] mt-5 origin-center"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(93, 173, 226, 0.5), transparent)",
              }}
            />

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: taglineVisible ? 1 : 0,
                y: taglineVisible ? 0 : 10,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[13px] sm:text-sm tracking-[0.25em] uppercase mt-4"
              style={{
                color: "rgba(174, 214, 241, 0.6)",
              }}
            >
              Renting Made Simple
            </motion.p>
          </div>

          {/* Progress Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: phase === "loading" ? 1 : 0,
              y: phase === "loading" ? 0 : 20,
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute bottom-[18%] sm:bottom-[15%] z-10 flex flex-col items-center w-56 sm:w-64"
          >
            {/* Progress bar track */}
            <div
              className="w-full h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(93, 173, 226, 0.1)" }}
            >
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, #2980b9, #3498db, #5dade2)",
                }}
              >
                {/* Glow at the tip */}
                <div
                  className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                  style={{
                    background: "radial-gradient(circle, rgba(93, 173, 226, 0.8), transparent)",
                    boxShadow: "0 0 12px rgba(52, 152, 219, 0.6)",
                  }}
                />
              </motion.div>
            </div>

            {/* Progress info */}
            <div className="flex justify-between items-center w-full mt-3">
              <span
                className="text-[11px] font-medium tracking-wider uppercase"
                style={{ color: "rgba(174, 214, 241, 0.35)" }}
              >
                {progress < 30
                  ? "Discovering"
                  : progress < 60
                  ? "Curating"
                  : progress < 90
                  ? "Preparing"
                  : "Ready"}
              </span>
              <motion.span
                key={Math.floor(progress / 10)}
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                className="text-[11px] font-medium tabular-nums"
                style={{ color: "rgba(174, 214, 241, 0.4)" }}
              >
                {Math.floor(progress)}%
              </motion.span>
            </div>
          </motion.div>

          {/* Bottom decorative dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "loading" ? 1 : 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute bottom-[10%] z-10 flex items-center gap-2"
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  width: i === 2 ? "6px" : "3px",
                  height: "3px",
                  backgroundColor:
                    i === 2
                      ? "rgba(93, 173, 226, 0.8)"
                      : "rgba(93, 173, 226, 0.25)",
                }}
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: i === 2 ? [0.8, 1, 0.8] : [0.25, 0.5, 0.25],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>

          {/* Corner accents */}
          <div className="absolute top-6 left-6 z-10">
            <motion.div
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 0.15, pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M0 20 L0 0 L20 0" stroke="#5dade2" strokeWidth="1" />
              </svg>
            </motion.div>
          </div>
          <div className="absolute top-6 right-6 z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M20 0 L40 0 L40 20" stroke="#5dade2" strokeWidth="1" />
              </svg>
            </motion.div>
          </div>
          <div className="absolute bottom-6 left-6 z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M0 20 L0 40 L20 40" stroke="#5dade2" strokeWidth="1" />
              </svg>
            </motion.div>
          </div>
          <div className="absolute bottom-6 right-6 z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ duration: 1, delay: 1.4 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M40 20 L40 40 L20 40" stroke="#5dade2" strokeWidth="1" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}