import type { GameState } from "../models/GameState";
import type { PlayerStatus } from "../models/PlayerStatus";
import { bettingRoundComplete, resetBets } from "./betting-selector";
import type { GameAction } from "./game-actions";
import { advanceToNextPhase } from "./phase-helper";
import { findNextPosition } from "./player-navigation";
import { markPlayerActed } from "./utils/acted-utils";
import { updatePlayer, updatePlayerStatus } from "./utils/seat-utils";

export function gameReducer(
    state: GameState,
    action: GameAction
): GameState {
    switch (action.type) {
        case "POST_BLINDS":
            return handlePostBlinds(state);
        case "FOLD":
            return handleFold(state, action);
        case "PLAYER_CHECK":
            return handleCheck(state, action);
        case "PLAYER_CALL":
            return handleCall(state, action);
        case "PLAYER_RAISE":
            return handleRaise(state, action);
        default:
            return state;
    }
}

function handleRaise(
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

function handleCall(
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

function handleCheck(state: GameState, action: { type: "PLAYER_CHECK"; position: number; }) {
    const nextState = {
        ...state,
        actedPositions: markPlayerActed(state.actedPositions, action.position),
    };

    return shouldEndBettingRound(nextState)
        ? advanceToNextPhase(nextState)
        : advanceToNextPlayer(nextState);
}

function handleFold(state: GameState, action: { type: "FOLD"; position: number; }) {
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

function handlePostBlinds(state: GameState) {
    const dealerPos = state.currentPlayerPosition;
    const sbPos = findNextPosition(state.table.seats, dealerPos);
    const bbPos = findNextPosition(state.table.seats, sbPos);

    let pot = state.pot;
    const acted: number[] = [];

    let seats = resetBets(state.table.seats);

    seats = updatePlayer(seats, sbPos, (player) => {
        pot += state.smallBlind;
        acted.push(sbPos);
        return {
            ...player,
            chips: player.chips - state.smallBlind,
            betThisRound: state.smallBlind,
        };
    });

    seats = updatePlayer(seats, bbPos, (player) => {
        pot += state.bigBlind;
        acted.push(bbPos);
        return {
            ...player,
            chips: player.chips - state.bigBlind,
            betThisRound: state.bigBlind,
        };
    });

    return {
        ...state,
        pot,
        currentBet: state.bigBlind,
        actedPositions: acted,
        currentPlayerPosition: findNextPosition(seats, bbPos),
        table: {
            ...state.table,
            seats,
        },
    };
}

function advanceToNextPlayer(state: GameState): GameState {
    const seats = state.table.seats;
    const totalSeats = seats.length;

    let next = state.currentPlayerPosition;

    do {
        next = (next + 1) % totalSeats;

        const seat = seats[next];

        const isActivePlayer = seat.player && seat.player.status === "active";

        if (isActivePlayer) {
            break;
        }
    } while (next !== state.currentPlayerPosition);

    return {
        ...state,
        currentPlayerPosition: next,
    };
}

function shouldEndBettingRound(state: GameState): boolean {
    return bettingRoundComplete(
        state.table.seats,
        state.actedPositions,
        state.currentBet
    );
}