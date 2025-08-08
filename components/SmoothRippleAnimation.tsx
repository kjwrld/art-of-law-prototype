import { motion } from "framer-motion";

export const SmoothRippleAnimation = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* First ripple */}
      <motion.div
        className="absolute w-4 h-4 bg-[var(--aow-gold)] rounded-full opacity-60"
        animate={{
          scale: [1, 3.5],
          opacity: [0.6, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: [0.4, 0, 0.6, 1],
        }}
      />
      
      {/* Second ripple - delayed */}
      <motion.div
        className="absolute w-4 h-4 bg-[var(--aow-gold)] rounded-full opacity-40"
        animate={{
          scale: [1, 3.5],
          opacity: [0.4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 1,
          ease: [0.4, 0, 0.6, 1],
        }}
      />
      
      {/* Third ripple - further delayed */}
      <motion.div
        className="absolute w-4 h-4 bg-[var(--aow-gold)] rounded-full opacity-30"
        animate={{
          scale: [1, 3.5],
          opacity: [0.3, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 2,
          ease: [0.4, 0, 0.6, 1],
        }}
      />
      
      {/* Center pulse for added depth */}
      <motion.div
        className="absolute w-2 h-2 bg-[var(--aow-gold)] rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};