import { motion } from "framer-motion";
import { ChevronLeft, Scale } from "lucide-react";
import { Button } from "./ui/button";

interface NotFoundPageProps {
  onNavigateHome: () => void;
}

export function NotFoundPage({ onNavigateHome }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-aow-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Animated 404 with Scales of Justice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              <Scale className="w-16 h-16 text-aow-gold" />
            </motion.div>
            <div className="font-industrial-gothic text-8xl md:text-9xl text-aow-gold">
              4<span className="text-white">0</span>4
            </div>
          </div>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4 mb-8"
        >
          <h1 className="font-industrial-gothic text-4xl md:text-5xl text-white mb-4">
            page not found
          </h1>
          <p className="text-white/70 text-lg font-['Luxora_Grotesk',_sans-serif] leading-relaxed max-w-md mx-auto">
            The legal precedent you're looking for seems to have been overruled. 
            Let's get you back to building your legal mastery.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={onNavigateHome}
            className="gradient-gold-radial text-aow-black hover:scale-105 transition-all duration-300 px-8 py-3 font-medium"
            size="lg"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Return to Home
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
            size="lg"
          >
            Go Back
          </Button>
        </motion.div>

        {/* Legal Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-aow-gold/20"
        >
          <blockquote className="text-aow-gold/80 italic font-['Luxora_Grotesk',_sans-serif]">
            "Justice delayed is justice denied, but a misdirected URL is just an opportunity to find a better path."
          </blockquote>
        </motion.div>
      </div>
    </div>
  );
}