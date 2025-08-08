interface CoursePortraitProps {
  title: string;
  moduleNumber?: number;
  className?: string;
}

export function CoursePortrait({ title, moduleNumber, className = "" }: CoursePortraitProps) {
  // Extract initials from course title
  const getInitials = (title: string) => {
    return title
      .split(' ')
      .filter(word => word.length > 0)
      .slice(0, 2) // Take first 2 words
      .map(word => word.charAt(0).toUpperCase())
      .join('');
  };

  const initials = getInitials(title);

  return (
    <div className={`relative w-full h-full bg-[#1a1a1a] flex items-center justify-center ${className}`}>
      {/* Dark background circle */}
      <div className="w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-[#2a2a2a] rounded-full border-2 border-white/10 flex items-center justify-center relative">
        
        {/* Initials */}
        <span className="text-white/80 font-['Alacrity_Sans',_sans-serif] font-semibold text-lg md:text-xl lg:text-2xl">
          {initials}
        </span>
        
        {/* Module number badge */}
        {moduleNumber && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-aow-gold rounded-full flex items-center justify-center border-2 border-[#1a1a1a]">
            <span className="text-aow-black font-['Luxora_Grotesk',_sans-serif] font-bold text-xs">
              {moduleNumber}
            </span>
          </div>
        )}
      </div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-lg"></div>
    </div>
  );
}