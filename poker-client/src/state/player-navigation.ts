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

export function findUTGPosition(
    seats: Seat[],
    dealerPosition: number
): number {
    let position = dealerPosition;

    for (let i = 0; i < 3; i++) {
        position = findNextPosition(seats, position);
    }

    if (!seats[position].player || seats[position].player!.status !== "active") {
        position = findNextActivePlayerPosition(seats, position);
    }

    return position;
}

export function findSmallBlindPosition(
    seats: Seat[],
    dealerPosition: number
): number {
    return findNextPosition(seats, dealerPosition);
}

export function findBigBlindPosition(
    seats: Seat[],
    dealerPosition: number
): number {
    const smallBlindPosition = findSmallBlindPosition(seats, dealerPosition);
    return findNextPosition(seats, smallBlindPosition);
}