import type { GameState } from "../models/GameState";

export function canPlayerAct(state: GameState): boolean {
    const currentSeat = state.table.seats[state.currentPlayerPosition];
    return (
        !!currentSeat.player &&
        currentSeat.player.status === "active" &&
        state.phase !== "showdown" &&
        state.pot > 0
    );
}

export function canPostBlinds(state: GameState): boolean {
    return state.pot === 0;
}
