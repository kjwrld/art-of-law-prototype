import { motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Button } from "../ui/button";

interface AIRecommendationNotificationProps {
  onClose: () => void;
  onAccept: () => void;
}

export const AIRecommendationNotification = ({ onClose, onAccept }: AIRecommendationNotificationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-24 right-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-5 max-w-sm z-50 shadow-2xl"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      }}
    >
      <div className="flex items-start gap-4">
        <div className="bg-white/20 rounded-full p-2.5 mt-1">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="text-white font-semibold mb-2 font-['Luxora_Grotesk:Medium',_sans-serif]">AI Recommendations</h4>
          <p className="text-white/80 text-sm mb-4 leading-relaxed font-['Luxora_Grotesk:Medium',_sans-serif]">
            We found 3 more practice areas that match your profile. Add them to your tabs?
          </p>
          <div className="flex gap-3">
            <Button 
              onClick={onAccept}
              size="sm" 
              className="bg-[var(--aow-gold)] text-[var(--aow-black)] hover:bg-[var(--aow-gold-light)] font-semibold px-4 py-2 h-auto rounded-lg"
            >
              Add Tabs
            </Button>
            <Button 
              onClick={onClose}
              variant="ghost" 
              size="sm" 
              className="text-white/70 hover:text-white hover:bg-white/10 font-medium px-4 py-2 h-auto rounded-lg border border-white/20"
            >
              Later
            </Button>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="text-white/40 hover:text-white/70 transition-colors p-1"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};