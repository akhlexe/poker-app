import type { Card } from "./Card";
import type { PlayerStatus } from "./PlayerStatus";

export interface Player {
    id: string;
    name: string;
    chips: number;
    cards: Card[];
    status: PlayerStatus;
    betThisRound: number;
}