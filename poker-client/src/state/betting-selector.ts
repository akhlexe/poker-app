import type { GameState } from "../models/GameState";
import type { Seat } from "../models/Seat";
import { activeSeats } from "./player-selector";

export function canPlayerCheck(
    currentPlayerPosition: number,
    seats: Seat[],
    currentBet: number
): boolean {
    const seat = seats[currentPlayerPosition];

    if (!seat.player || seat.player.status !== "active") {
        return false;
    }

    return seat.player.betThisRound === currentBet;
}

export function isBettingRoundComplete(
    seats: Seat[],
    actedPositions: number[],
    currentBet: number
): boolean {
    const active = activeSeats(seats);
    const allActed = active.every((seat) =>
        actedPositions.includes(seat.position)
    )

    return allActed
        ? active.every((seat) => seat.player!.betThisRound === currentBet)
        : false;
}

export function resetBets(seats: Seat[]): Seat[] {
    return seats.map((seat) => {
        if (!seat.player) {
            return seat;
        }

        return {
            ...seat,
            player: {
                ...seat.player,
                betThisRound: 0,
            },
        }
    })
}

export function shouldEndBettingRound(state: GameState): boolean {
    return isBettingRoundComplete(
        state.table.seats,
        state.actedPositions,
        state.currentBet
    );
}