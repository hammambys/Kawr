import Image from "./Image.jsx";

export default function GameImg({ game, index = 0, className = null }) {
  if (!game.photos?.length) {
    return "";
  }
  if (!className) {
    className = "object-cover";
  }
  return <Image className={className} src={game.photos[index]} alt="" />;
}
