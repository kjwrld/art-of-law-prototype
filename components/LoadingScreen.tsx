import { motion } from "framer-motion";
import logoImage from "../src/assets/logo.png";

interface LoadingScreenProps {
    progress?: number;
}

export function LoadingScreen({ progress = 0 }: LoadingScreenProps) {
    return (
        <motion.div
            className="fixed inset-0 bg-aow-black z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Background subtle pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-aow-gold/10 via-transparent to-aow-gold/5" />
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Logo with breathing animation */}
                <motion.div
                    className="w-16 h-16 mb-8"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    <img
                        src={logoImage}
                        alt="Art of Law Logo"
                        className="w-full h-full object-contain"
                    />
                </motion.div>

                {/* Art of Law text */}
                <motion.h1
                    className="text-2xl md:text-3xl font-['Luxora_Grotesk',_sans-serif] text-white font-medium mb-2 tracking-wide"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    ART OF LAW
                </motion.h1>

                <motion.p
                    className="text-aow-gold text-sm mb-12 font-['Luxora_Grotesk',_sans-serif]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    Your Gateway to Legal Mastery
                </motion.p>

                {/* Progress bar */}
                <div className="w-64 md:w-80 mb-4">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-aow-gold-dark via-aow-gold to-aow-gold-light rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>

                {/* Progress percentage */}
                <motion.span
                    className="text-aow-gold text-xs font-manrope font-medium"
                    key={progress} // Re-animate when progress changes
                    initial={{ opacity: 0.6, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    {Math.round(progress)}%
                </motion.span>
            </div>
        </motion.div>
    );
}
