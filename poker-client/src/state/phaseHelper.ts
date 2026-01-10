import type { GamePhase } from "../models/GamePhase";
import type { GameState } from "../models/GameState";
import { resetBets } from "./bettingSelector";
import { findNextActivePlayerPosition } from "./playerNavigation";
import { activeSeats } from "./playerSelector";

const phaseOrder: GamePhase[] = [
    "pre-flop",
    "flop",
    "turn",
    "river",
    "showdown",
];

export function nextPhase(currentPhase: GamePhase): GamePhase {
    const index = phaseOrder.indexOf(currentPhase);
    return phaseOrder[Math.min(index + 1, phaseOrder.length - 1)];
}

export function shouldAdvanceToShowdown(state: GameState): boolean {
    return activeSeats(state.table.seats).length <= 1;
}

export function advanceToNextPhase(state: GameState): GameState {
    // If only one player remains, go directly to showdown
    if (shouldAdvanceToShowdown(state)) {
        return {
            ...state,
            phase: "showdown",
            actedPositions: [],
        };
    }

    const nextPlayerPosition = findNextActivePlayerPosition(
        state.table.seats,
        state.table.dealerPosition
    );

    return {
        ...state,
        phase: nextPhase(state.phase),
        actedPositions: [],
        currentPlayerPosition: nextPlayerPosition,
        currentBet: 0,
        table: {
            ...state.table,
            seats: resetBets(state.table.seats),
        },
    };
}
