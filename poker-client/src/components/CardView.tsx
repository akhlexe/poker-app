import type { Card } from "../models/Card";

interface Props {
  card: Card;
}

export function CardView({ card }: Props) {
  return (
    <span className="card">
      {card.rank}
      {card.suit}
    </span>
  );
}
