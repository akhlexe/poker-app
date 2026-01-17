import type { Card } from "../models/Card";
import styles from "./CardView.module.css";

interface Props {
  card: Card;
}

const getSuitClass = (suit: string) => {
  switch (suit) {
    case "♠":
      return styles.spades;
    case "♥":
      return styles.hearts;
    case "♦":
      return styles.diamonds;
    case "♣":
      return styles.clubs;
    default:
      return "";
  }
};

export function CardView({ card }: Props) {
  return (
    <div className={styles.card}>
      <span className={`${styles.rank} ${getSuitClass(card.suit)}`}>
        {card.rank}
      </span>
      <span className={`${styles.suit} ${getSuitClass(card.suit)}`}>
        {card.suit}
      </span>
    </div>
  );
}
