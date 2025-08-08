import svgPaths from "./svg-e0ag3zv150";
import imgPicture from "figma:asset/a4ef0a37f95ad316b042700258d71e6346580081.png";

function CardPictureCredit() {
  return (
    <div
      className="absolute box-border content-stretch flex flex-row gap-2 h-[29px] items-center justify-center left-[210px] px-3.5 py-[3px] rounded-[44px] top-[157px] w-[94px]"
      data-name="card picture credit"
    >
      <div
        className="h-[13px] relative shrink-0 w-[13.598px]"
        data-name="Vector"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 14 13"
        >
          <g id="Vector">
            <path d={svgPaths.p8230400} fill="url(#paint0_linear_5_532)" />
            <path
              d={svgPaths.p8230400}
              fill="url(#paint1_linear_5_532)"
              fillOpacity="0.42"
            />
          </g>
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_5_532"
              x1="0"
              x2="13.5985"
              y1="6.5"
              y2="6.5"
            >
              <stop offset="0.0721154" stopColor="#9A7D50" />
              <stop offset="0.394231" stopColor="#CDB083" />
              <stop offset="0.625" stopColor="#CDB083" />
              <stop offset="0.980769" stopColor="#9A7D50" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint1_linear_5_532"
              x1="6.79924"
              x2="6.79924"
              y1="13"
              y2="0"
            >
              <stop stopColor="#9A7D50" />
              <stop offset="0.509615" stopColor="#D6C7B0" stopOpacity="0" />
              <stop offset="1" stopColor="#9A7D50" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="font-['Luxora_Grotesk:Book',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap">
        <p className="block leading-[normal] whitespace-pre">2.0</p>
      </div>
    </div>
  );
}

function CardPictureTag() {
  return (
    <div
      className="absolute bg-[#ffffff] box-border content-stretch flex flex-row gap-2.5 h-[29px] items-center justify-center left-[210px] px-3.5 py-[3px] rounded-[44px] shadow-[0px_1px_4px_0px_rgba(0,0,0,0.2)] top-3 w-[94px]"
      data-name="card picture tag"
    >
      <div
        className="[text-shadow:rgba(0,0,0,0.25)_0px_0px_1.8px] bg-clip-text font-['Alacrity_Sans:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[14px] text-center text-nowrap"
        style={{ WebkitTextFillColor: "transparent" }}
      >
        <p className="block leading-[normal] whitespace-pre">New</p>
      </div>
    </div>
  );
}

function CardPicture() {
  return (
    <div
      className="bg-[#ffffff] h-[198px] overflow-clip relative rounded-xl shrink-0 w-[312px]"
      data-name="card picture"
    >
      <div
        className="absolute bg-[44.92%_43.81%] bg-no-repeat bg-size-[179.09%_214.14%] h-[198px] left-[-59px] top-0 w-[423px]"
        data-name="picture"
        style={{ backgroundImage: `url('${imgPicture}')` }}
      />
      <div className="absolute h-[198px] left-[-3px] top-0 w-[323px]" />
      <CardPictureCredit />
      <CardPictureTag />
    </div>
  );
}

export default function Frame6() {
  return (
    <div className="box-border content-stretch flex flex-col gap-3 items-start justify-center p-0 relative size-full">
      <CardPicture />
      <div
        className="[text-shadow:rgba(0,0,0,0.25)_0px_7px_5px] font-['Alacrity_Sans:Regular',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[normal]">Title</p>
      </div>
      <div
        className="[text-shadow:rgba(0,0,0,0.25)_0px_7px_5px] font-['Luxora_Grotesk:Book',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[16px] text-[rgba(255,255,255,0.85)] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[normal]">Class Description</p>
      </div>
      <div
        className="[text-shadow:rgba(0,0,0,0.25)_0px_7px_5px] font-['Luxora_Grotesk:Book',_sans-serif] leading-[0] min-w-full not-italic relative shrink-0 text-[12px] text-[rgba(255,255,255,0.7)] text-left"
        style={{ width: "min-content" }}
      >
        <p className="block leading-[normal]">Class Description</p>
      </div>
    </div>
  );
}