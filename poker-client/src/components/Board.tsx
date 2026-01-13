import type { Card } from "../models/Card";
import { CardView } from "./CardView";

interface Props {
  cards: Card[];
}

export function Board({ cards }: Props) {
  const slots = Array(5).fill(null);

  return (
    <div
      className="board"
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        alignItems: "center",
        minHeight: "100px",
      }}
    >
      {slots.map((_, index) => {
        const card = cards[index];
        if (card) {
          return <CardView key={index} card={card} />;
        }

        return (
          <div
            key={index}
            style={{
              width: "60px",
              height: "84px",
              border: "2px dashed rgba(255, 255, 255, 0.2)",
              borderRadius: "4px",
            }}
          />
        );
      })}
    </div>
  );
}
