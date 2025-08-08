export default function CardPictureTag() {
  return (
    <div
      className="relative rounded-[44px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.2)] size-full"
      data-name="card picture tag"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center px-3.5 py-[3px] relative size-full">
          <div
            className="[text-shadow:rgba(0,0,0,0.25)_0px_0px_1.8px] bg-clip-text font-['Alacrity_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            <p className="block leading-[normal] whitespace-pre">New</p>
          </div>
        </div>
      </div>
    </div>
  );
}