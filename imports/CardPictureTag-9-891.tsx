import img39023320014 from "figma:asset/bf702d6b9de7b799e2cd2fe16344154559a4c6f5.png";

function WhiteAward() {
  return (
    <div
      className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0"
      data-name="white award"
    >
      <div
        className="[grid-area:1_/_1] bg-[#ffffff] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.483px] mask-size-[21.725px_21.725px] ml-[0.483px] mt-[0.483px] size-[21.725px]"
        data-name="390233-200 (1) 4"
        style={{ maskImage: `url('${img39023320014}')` }}
      />
    </div>
  );
}

export default function CardPictureTag() {
  return (
    <div
      className="relative rounded-[44px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)] size-full"
      data-name="card picture tag"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-center leading-[0] px-3.5 py-[3px] relative size-full">
          <WhiteAward />
          <div className="[text-shadow:rgba(0,0,0,0.25)_0px_1px_4px] font-['Alacrity_Sans:Regular',_sans-serif] not-italic relative shrink-0 text-[#e2ded8] text-[12px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Featured</p>
          </div>
        </div>
      </div>
    </div>
  );
}