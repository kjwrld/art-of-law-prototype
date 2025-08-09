import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
  presetValue?: string;
}

export const FilterDropdown = ({ 
  label, 
  options, 
  selectedValue, 
  onSelect, 
  isOpen, 
  onToggle,
  presetValue 
}: FilterDropdownProps) => {
  const displayValue = selectedValue 
    ? options.find(opt => opt.value === selectedValue)?.label 
    : presetValue || label;
    
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="bg-[#222222] rounded-full px-6 py-3 flex items-center gap-3 text-white min-w-[140px] justify-center"
      >
        <span className="font-medium text-center font-['Luxora_Grotesk:Medium',_sans-serif]">
          {presetValue ? `${label}: ${displayValue}` : displayValue}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-2 bg-[#1a1a1a] border border-white/20 rounded-xl p-3 min-w-[200px] z-50 shadow-xl backdrop-blur-xl"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onSelect(option.value);
                  onToggle();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-all duration-200"
              >
                <div className={`w-4 h-4 rounded-full ${
                  selectedValue === option.value 
                    ? 'bg-aow-gold' 
                    : 'bg-white/40'
                }`}></div>
                <span className="text-white font-medium font-['Luxora_Grotesk:Medium',_sans-serif]">{option.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};