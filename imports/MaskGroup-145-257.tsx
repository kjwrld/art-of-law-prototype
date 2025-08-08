import imgRectangle5 from "../src/assets/placeholder.svg";

export default function MaskGroup() {
  return (
    <div className="relative size-full flex items-center justify-center" data-name="Mask group">
      <div
        className="bg-[#c4bdb2] mask-alpha mask-intersect mask-no-clip mask-no-repeat size-5"
        style={{ maskImage: `url('${imgRectangle5}')`, maskSize: 'contain', maskPosition: 'center', maskRepeat: 'no-repeat' }}
      />
    </div>
  );
}