interface NewTagProps {
  className?: string;
}

export function NewTag({ className = "" }: NewTagProps) {
  return (
    <div className={`relative rounded-[44px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.2)] size-full bg-white ${className}`}>
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-3.5 py-[3px] relative size-full">
          <div className="font-['Alacrity_Sans',_sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap text-black">
            <p className="block leading-[normal] whitespace-pre">New</p>
          </div>
        </div>
      </div>
    </div>
  );
}