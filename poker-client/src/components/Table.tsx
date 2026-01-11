import type { GameTable } from "../models/GameTable";
import { Seat } from "./Seat";

interface Props {
  table: GameTable;
  currentPlayerPosition: number;
  onFold: (position: number) => void;
}

export function Table({ table, currentPlayerPosition, onFold }: Props) {
  return (
    <div>
      <div className="table">
        {table.seats.map((seat) => (
          <Seat
            key={seat.position}
            seat={seat}
            isDealer={seat.position === table.dealerPosition}
            isCurrentPlayer={seat.position === currentPlayerPosition}
            showFoldButton={seat.position === currentPlayerPosition}
            onFold={() => onFold(seat.position)}
          />
        ))}
      </div>
    </div>
  );
}
