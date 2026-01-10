import type { Card } from "../models/Card";
import { CardView } from "./CardView";

interface Props {
  cards: Card[];
}

export function Board({ cards }: Props) {
  return (
    <div className="board">
      {cards.map((card, index) => (
        <CardView key={index} card={card} />
      ))}
    </div>
  );
}
