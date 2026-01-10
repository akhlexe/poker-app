import type { Seat as SeatModel } from "../models/Seat";
import { CardView } from "./CardView";

interface Props {
  seat: SeatModel;
  isDealer: boolean;
  isCurrentPlayer: boolean;
  showFoldButton: boolean;
  onFold: () => void;
}

export function Seat({
  seat,
  isDealer,
  isCurrentPlayer,
  showFoldButton,
  onFold,
}: Props) {
  if (!seat.player) {
    return (
      <div className="seat empty">
        <span>Empty</span>
      </div>
    );
  }

  const isFolded = seat.player.status === "folded";

  return (
    <div
      className={`seat occupied 
        ${isCurrentPlayer ? "current" : ""} 
        ${isFolded ? "folded" : ""} 
        `}
    >
      <div>
        <strong>{seat.player.name}</strong>
        {isDealer && <span> 🃏</span>}
      </div>
      <div className="cards">
        {seat.player.cards.map((card, i) => (
          <CardView key={i} card={card} />
        ))}
      </div>
      <div>Chips: {seat.player.chips}</div>
      <div>
        {showFoldButton && seat.player.status === "active" && (
          <button onClick={onFold}>Fold</button>
        )}
      </div>
    </div>
  );
}
