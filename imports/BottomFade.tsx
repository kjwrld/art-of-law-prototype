import imgBottomFade from "/src/assets/placeholder.svg";

export default function BottomFade() {
  return (
    <div
      className="bg-center bg-cover bg-no-repeat size-full"
      data-name="bottom fade"
      style={{ backgroundImage: `url('${imgBottomFade}')` }}
    />
  );
}