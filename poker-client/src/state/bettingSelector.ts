import type { Seat } from "../models/Seat";
import { activeSeats } from "./playerSelector";

export function bettingRoundComplete(
    seats: Seat[],
    actedPositions: number[],
    currentBet: number
): boolean {
    const active = activeSeats(seats);
    const allActed = active.every((seat) =>
        actedPositions.includes(seat.position)
    )

    if (!allActed) {
        return false;
    }

    const allMatched = active.every((seat) =>
        seat.player!.betThisRound === currentBet
    );

    return allMatched;
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
