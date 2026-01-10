import type { Seat } from "../models/Seat";

export function activeSeats(seats: Seat[]): Seat[] {
    return seats
        .filter((seat) => seat.player && seat.player.status === "active")
}

export function activePositions(seats: Seat[]): number[] {
    return seats
        .filter((seat) => seat.player && seat.player.status === "active")
        .map((seat) => seat.position);
}

export function allActivePlayersActed(
    seats: Seat[],
    acted: number[],
): boolean {
    return activePositions(seats)
        .every((position) => acted.includes(position))
}

export function allBetsMatched(
    seats: Seat[],
    currentBet: number,
): boolean {
    return activeSeats(seats).every((seat) => seat.player!.betThisRound === currentBet)
}

export function firstActivePlayerAfterDealer(
    seats: Seat[],
    dealerPosition: number
): number {
    let p = dealerPosition;

    do {
        p = (p + 1) % seats.length;
    } while (!seats[p].player || seats[p].player!.status !== "active")

    return p;
}