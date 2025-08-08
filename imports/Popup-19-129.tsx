import svgPaths from "./svg-cpvysnooko";
import img39023320014 from "figma:asset/bf702d6b9de7b799e2cd2fe16344154559a4c6f5.png";
import imgPicture from "figma:asset/61a2e5908b18a0fac6cb7ece7e088ecfe829c732.png";

function Button() {
  return (
    <div
      className="bg-[#ffffff] box-border content-stretch flex flex-row gap-2 items-center justify-center overflow-clip px-[47px] py-3 relative rounded-3xl shrink-0"
      data-name="Button"
    >
      <div className="h-[15px] relative shrink-0 w-[13px]">
        <div className="absolute bottom-[9.27%] left-0 right-[15.41%] top-[10.2%]">
          <svg
            className="block size-full"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 11 13"
          >
            <path
              d={svgPaths.pb7a6f00}
              fill="var(--fill-0, #0B0B0B)"
              id="Polygon 1"
            />
          </svg>
        </div>
      </div>
      <div className="font-['Manrope:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#0b0b0b] text-[14px] text-left text-nowrap">
        <p className="block leading-none whitespace-pre">Play Now</p>
      </div>
    </div>
  );
}

function Frame4056() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-2.5 h-[371px] items-start justify-center left-[75px] p-0 top-[199px] w-[385px]">
      <div className="[text-shadow:rgba(0,0,0,0.25)_0px_7px_5px] font-['Alacrity_Sans:Regular',_sans-serif] h-[117px] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[48px] text-left w-[375px]">
        <p className="block leading-[normal]">the theater of the courtroom</p>
      </div>
      <div className="[text-shadow:rgba(0,0,0,0.25)_0px_7px_5px] font-['Luxora_Grotesk:Book',_sans-serif] h-24 leading-[0] not-italic relative shrink-0 text-[#e2ded8] text-[20px] text-left w-full">
        <p className="block leading-[normal]">
          Master storytelling, voice, movement, and presence to command the
          courtroom like a stage.
        </p>
      </div>
      <Button />
    </div>
  );
}

function Frame4057() {
  return (
    <div className="absolute h-40 left-[283px] top-[501px] w-[742px]">
      <div className="box-border content-stretch flex flex-row gap-2.5 h-40 items-center justify-center overflow-clip p-[8px] relative w-[742px]">
        <div className="[text-shadow:rgba(0,0,0,0.25)_0px_7px_5px] basis-0 font-['Luxora_Grotesk:Book',_sans-serif] grow h-full leading-[36px] min-h-px min-w-px not-italic relative shrink-0 text-[#e2ded8] text-[20px] text-right">
          <p className="block mb-0">Litigation Track</p>
          <p className="block mb-0">2.0 Credits</p>
          <p className="block mb-0">7 Modules</p>
          <p className="block">&nbsp;</p>
        </div>
      </div>
      <div
        aria-hidden="true"
        className="absolute border-[#e2ded8] border-[1px_0px_0px] border-solid inset-0 pointer-events-none"
      />
    </div>
  );
}

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

function CardPictureTag() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row h-[29px] items-center justify-center leading-[0] left-[944px] px-3.5 py-[3px] rounded-[44px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.2)] top-9 w-[94px]"
      data-name="card picture tag"
    >
      <WhiteAward />
      <div className="[text-shadow:rgba(0,0,0,0.25)_0px_1px_4px] font-['Alacrity_Sans:Regular',_sans-serif] not-italic relative shrink-0 text-[#e2ded8] text-[12px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Featured</p>
      </div>
    </div>
  );
}

export default function Popup() {
  return (
    <div
      className="bg-[rgba(196,189,178,0.05)] overflow-clip relative rounded-3xl size-full"
      data-name="popup"
    >
      <div
        className="absolute bg-[56.8%_66.33%] bg-no-repeat bg-size-[115.16%_103.49%] h-[650px] left-1/2 rounded-3xl top-1/2 translate-x-[-50%] translate-y-[-50%] w-[1046px]"
        data-name="picture"
        style={{ backgroundImage: `url('${imgPicture}')` }}
      />
      <Frame4056 />
      <Frame4057 />
      <CardPictureTag />
    </div>
  );
}