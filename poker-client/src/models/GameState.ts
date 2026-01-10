import type { Card } from "./Card";
import type { GamePhase } from "./GamePhase";
import type { GameTable } from "./GameTable";

export interface GameState {
    table: GameTable;
    pot: number;
    currentPlayerPosition: number;
    phase: GamePhase;
    board: Card[];
    actedPositions: number[];

    currentBet: number;

    smallBlind: number;
    bigBlind: number;
}