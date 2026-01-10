import type { Card } from "../models/Card";
import type { GamePhase } from "../models/GamePhase";

export function visibleBoard(
    board: Card[],
    phase: GamePhase
): Card[] {
    switch (phase) {
        case "flop":
            return board.slice(0, 3);
        case "turn":
            return board.slice(0, 4);
        case "river":
        case "showdown":
            return board;
        default:
            return [];
    }
}