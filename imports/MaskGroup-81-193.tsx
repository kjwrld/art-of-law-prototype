import svgPaths from "./svg-f7ex9kgm4t";

export default function Logo() {
  return (
    <div className="relative size-full" data-name="Mask group">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 539 479"
      >
        <g clipPath="url(#clip0_3_39)" id="Mask group">
          <mask
            height="479"
            id="mask0_3_39"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="539"
            x="0"
            y="0"
          >
            <path
              d={svgPaths.p28445980}
              fill="var(--fill-0, black)"
              id="Vector"
            />
          </mask>
          <g mask="url(#mask0_3_39)">
            <rect
              fill="var(--fill-0, #E2DED8)"
              height="238.825"
              id="Rectangle 4"
              stroke="url(#paint0_linear_3_39)"
              strokeWidth="238.825"
              width="300.175"
              x="119.413"
              y="119.413"
            />
          </g>
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_3_39"
            x1="1.84262"
            x2="475.862"
            y1="468.769"
            y2="1.84256"
          >
            <stop offset="0.22248" stopColor="#9A7D50" />
            <stop offset="0.423077" stopColor="#B5925B" />
            <stop offset="0.528846" stopColor="#C9AB7D" />
            <stop offset="0.673077" stopColor="#A7854F" />
            <stop offset="0.817308" stopColor="#CBA56A" />
            <stop offset="0.907401" stopColor="#9A7D50" />
          </linearGradient>
          <clipPath id="clip0_3_39">
            <rect fill="white" height="478.093" width="539" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}