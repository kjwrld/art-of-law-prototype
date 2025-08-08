function EarlyAccessBadge() {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="relative">
        {/* Main badge background with gradient */}
        <div 
          className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[var(--aow-gold-dark)] via-[var(--aow-gold)] to-[var(--aow-gold-dark)] shadow-lg"
          style={{ 
            filter: 'drop-shadow(0 2px 8px rgba(215, 185, 140, 0.4))' 
          }}
        >
          <div className="font-['Alacrity_Sans',_sans-serif] font-normal text-[var(--aow-black)] text-base tracking-[0.025em] uppercase">
            Early Access
          </div>
        </div>
        
        {/* Subtle outer glow */}
        <div 
          className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--aow-gold-dark)] via-[var(--aow-gold)] to-[var(--aow-gold-dark)] opacity-30 blur-sm -z-10"
        />
      </div>
    </div>
  );
}



export default function GoldenWreath() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center pl-0 pr-5 py-0 relative size-full"
      data-name="early access badge"
    >
      <EarlyAccessBadge />
    </div>
  );
}