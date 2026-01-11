import type { Player } from "../../models/Player";
import type { PlayerStatus } from "../../models/PlayerStatus";
import type { Seat } from "../../models/Seat";

export function updatePlayer(
    seats: Seat[],
    position: number,
    updater: (player: Player) => Player
): Seat[] {
    return seats.map((seat) => {
        if (seat.position !== position || !seat.player) {
            return seat;
        }

        return {
            ...seat,
            player: updater(seat.player),
        }
    })
}

export function updatePlayerStatus(
    seats: Seat[],
    position: number,
    status: PlayerStatus
): Seat[] {
    return updatePlayer(seats, position, (player) => ({
        ...player,
        status,
    }));
}