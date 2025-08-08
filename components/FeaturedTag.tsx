import { Award } from "lucide-react";

interface FeaturedTagProps {
  className?: string;
}

export function FeaturedTag({ className = "" }: FeaturedTagProps) {
  return (
    <div className={`relative w-full h-full ${className}`}>
      <div className="relative w-full h-full bg-aow-gold rounded-full shadow-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Just the Ribbon/Award Icon */}
          <Award className="w-3 h-3 text-black" strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}