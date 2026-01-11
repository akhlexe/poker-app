import type { Seat as SeatModel } from "../models/Seat";
import { CardView } from "./CardView";

interface Props {
  seat: SeatModel;
  isDealer: boolean;
  isCurrentPlayer: boolean;
  onFold: () => void;
}

export function Seat({ seat, isDealer, isCurrentPlayer, onFold }: Props) {
  if (!seat.player) {
    return (
      <div className="seat empty">
        <span>Empty</span>
      </div>
    );
  }

  const isFolded = seat.player.status === "folded";
  const canAct = isCurrentPlayer && !isFolded;

  return (
    <div
      className={`seat occupied 
        ${isCurrentPlayer ? "current" : ""} 
        ${isFolded ? "folded" : ""} 
        `}
    >
      <div style={{ fontWeight: "bold", marginBottom: 4 }}>
        {seat.player.name}
        {isDealer && <span style={{ marginLeft: 4 }}> 🃏</span>}
      </div>
      <div className="cards" style={{ margin: "8px 0" }}>
        {seat.player.cards.map((card, i) => (
          <CardView key={i} card={card} />
        ))}
      </div>
      <div style={{ fontSize: "0.9em", color: "#00d9ff" }}>
        {seat.player.chips} chips
      </div>
      {seat.player.betThisRound > 0 && (
        <div
          style={{
            fontSize: "0.85em",
            color: "#ffcc00",
            marginTop: 4,
            fontWeight: "bold",
          }}
        >
          Bet: ${seat.player.betThisRound}
        </div>
      )}

      <div style={{ marginTop: 8 }}>
        <button
          onClick={onFold}
          disabled={!canAct}
          style={{
            opacity: canAct ? 1 : 0.5,
            cursor: canAct ? "pointer" : "not-allowed",
            backgroundColor: canAct ? "#ddd" : "#666",
          }}
        >
          {isFolded ? "Folded" : "Fold"}
        </button>
      </div>
    </div>
  );
}
