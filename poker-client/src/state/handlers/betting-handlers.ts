import type { GameState } from "../../models/GameState";
import { shouldEndBettingRound } from "../betting-selector";
import { advanceToNextPhase } from "../phase-helper";
import { advanceToNextPlayer } from "../player-navigation";
import { markPlayerActed } from "../utils/acted-utils";
import { updatePlayer } from "../utils/seat-utils";

/**
 * Handles a player checking (betting $0 when no one has bet).
 * 
 * Logic:
 * 1. Mark player as acted
 * 2. Check if betting round is complete → advance phase or player
 */
export function handleCheck(
    state: GameState,
    action: { type: "PLAYER_CHECK"; position: number; }
): GameState {
    const nextState = {
        ...state,
        actedPositions: markPlayerActed(state.actedPositions, action.position),
    };

    return shouldEndBettingRound(nextState)
        ? advanceToNextPhase(nextState)
        : advanceToNextPlayer(nextState);
}

/**
 * Handles a player raising the bet.
 * 
 * Logic:
 * 1. Calculate new bet amount
 * 2. Deduct chips from player
 * 3. Add to pot
 * 4. Reset actedPositions (only raiser has acted in new round)
 * 5. Advance to next player
 */
export function handleRaise(
    state: GameState,
    action: { type: "PLAYER_RAISE"; position: number; amount: number; }
): GameState {
    const newBet = state.currentBet + action.amount;
    let raiseAmount = 0;

    const seats = updatePlayer(
        state.table.seats,
        action.position,
        (player) => {
            raiseAmount = newBet - player.betThisRound;

            return {
                ...player,
                chips: player.chips - raiseAmount,
                betThisRound: newBet,
            };
        }
    );

    const nextState = {
        ...state,
        currentBet: newBet,
        pot: state.pot + raiseAmount,
        table: {
            ...state.table,
            seats,
        },
        actedPositions: [action.position],
    };

    return advanceToNextPlayer(nextState);
}

/**
 * Handles a player calling (matching current bet).
 * 
 * Logic:
 * 1. Calculate call amount (difference between current bet and player's bet)
 * 2. Deduct chips
 * 3. Add to pot
 * 4. Mark player as acted
 * 5. Check if betting round is complete → advance phase or player
 */
export function handleCall(
    state: GameState,
    action: { type: "PLAYER_CALL"; position: number; }
): GameState {
    let callAmount = 0;

    const seats = updatePlayer(
        state.table.seats,
        action.position,
        (player) => {
            callAmount = state.currentBet - player.betThisRound;

            return {
                ...player,
                chips: player.chips - callAmount,
                betThisRound: state.currentBet,
            };
        }
    );

    const nextState = {
        ...state,
        pot: state.pot + callAmount,
        actedPositions: markPlayerActed(state.actedPositions, action.position),
        table: {
            ...state.table,
            seats,
        },
    };

    return shouldEndBettingRound(nextState)
        ? advanceToNextPhase(nextState)
        : advanceToNextPlayer(nextState);
}

