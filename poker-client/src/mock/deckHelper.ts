import type { Card } from "../models/Card";

export function card(rank: Card["rank"], suit: Card["suit"]): Card {
    return { rank, suit };
}