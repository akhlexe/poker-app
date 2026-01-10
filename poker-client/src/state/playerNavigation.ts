import type { GameState } from "../models/GameState";
import type { Seat } from "../models/Seat";

export function findNextPosition(
    seats: Seat[],
    fromPosition: number
): number {
    let position = fromPosition;

    do {
        position = (position + 1) % seats.length;
    } while (!seats[position].player);

    return position;
}

export function findNextActivePlayerPosition(
    seats: Seat[],
    fromPosition: number
): number {
    let position = fromPosition;

    do {
        position = (position + 1) % seats.length;
    } while (!seats[position].player || seats[position].player!.status !== "active");

    return position;
}

export function advanceToNextPlayer(state: GameState): GameState {
    return {
        ...state,
        currentPlayerPosition: findNextActivePlayerPosition(
            state.table.seats,
            state.currentPlayerPosition
        ),
    };
}