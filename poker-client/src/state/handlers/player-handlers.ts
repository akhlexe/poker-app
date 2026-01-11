import type { GameState } from "../../models/GameState";
import type { PlayerStatus } from "../../models/PlayerStatus";
import { shouldEndBettingRound } from "../betting-selector";
import { advanceToNextPhase } from "../phase-helper";
import { advanceToNextPlayer } from "../player-navigation";
import { updatePlayerStatus } from "../utils/seat-utils";

/**
 * Handles a player folding.
 * 
 * Logic:
 * 1. Mark player as "folded"
 * 2. Check if betting round is complete → advance phase or player
 */
export function handleFold(state: GameState, action: { type: "FOLD"; position: number; }) {
    const seats = updatePlayerStatus(
        state.table.seats,
        action.position,
        "folded" as PlayerStatus
    );

    const nextState = {
        ...state,
        table: {
            ...state.table,
            seats,
        },
    };

    return shouldEndBettingRound(nextState)
        ? advanceToNextPhase(nextState)
        : advanceToNextPlayer(nextState);
}