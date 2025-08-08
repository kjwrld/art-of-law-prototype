import svgPaths from "./svg-5k1o6eehkm";

function CardPictureCredit() {
  return (
    <div
      className="relative rounded-[44px] size-full"
      data-name="card picture credit"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-2 items-center justify-center px-3.5 py-[3px] relative size-full">
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
      </div>
    </div>
  );
}

export default function CardPictureCredit1() {
  return (
    <div
      className="relative rounded-[44px] size-full"
      data-name="card picture credit"
    >
      <CardPictureCredit />
    </div>
  );
}