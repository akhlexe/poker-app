import type { GameState } from "../models/GameState";
import type { Player } from "../models/Player";
import type { PlayerStatus } from "../models/PlayerStatus";
import type { Seat } from "../models/Seat";
import { bettingRoundComplete, resetBets } from "./bettingSelector";
import type { GameAction } from "./gameActions";
import { nextPhase } from "./phaseHelper";
import { activeSeats } from "./playerSelector";

export function gameReducer(
    state: GameState,
    action: GameAction
): GameState {
    switch (action.type) {
        case "POST_BLINDS":
            return handlePostBlinds(state);
        case "NEXT_PLAYER":
            return advanceToNextPlayer(state);
        case "FOLD":
            return handleFold(state, action);
        case "ADD_TO_POT":
            return handleAddToPot(state, action);
        case "PLAYER_CHECK":
            return handleCheck(state, action);
        case "PLAYER_CALL":
            return handleCall(state, action);
        case "PLAYER_RAISE":
            return handleRaise(state, action);
        case "END_TURN":
            return handleEndTurn(state);
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
        actedPositions: markActed(state.actedPositions, action.position),
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
        actedPositions: markActed(state.actedPositions, action.position),
    };

    return shouldEndBettingRound(nextState)
        ? advanceToNextPhase(nextState)
        : advanceToNextPlayer(nextState);
}

function handleAddToPot(state: GameState, action: { type: "ADD_TO_POT"; amount: number; }): GameState {
    return {
        ...state,
        pot: state.pot + action.amount,
    };
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
    const sbPos = nextPosition(state.table.seats, state.currentPlayerPosition);
    const bbPos = nextPosition(state.table.seats, sbPos);

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
        currentPlayerPosition: nextPosition(seats, bbPos),
        table: {
            ...state.table,
            seats,
        },
    };
}

function updatePlayer(
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

function markActed(
    acted: number[],
    position: number
): number[] {
    return acted.includes(position)
        ? acted
        : [...acted, position];
}

function nextPosition(
    seats: Seat[],
    position: number
): number {
    let p = position;

    do {
        p = (p + 1) % seats.length;
    } while (!seats[p].player)

    return p;
}



function advanceToNextPhase(state: GameState): GameState {
    const active = activeSeats(state.table.seats);

    if (active.length <= 1) {
        return {
            ...state,
            phase: "showdown",
            actedPositions: [],
        }
    }

    // Otherwise advance to next phase
    const next = active[0].position;

    return {
        ...state,
        phase: nextPhase(state.phase),
        actedPositions: [],
        currentPlayerPosition: next,
        currentBet: 0,
        table: {
            ...state.table,
            seats: resetBets(state.table.seats),
        }
    }
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

function handleEndTurn(state: GameState): GameState {
    return shouldEndBettingRound(state)
        ? advanceToNextPhase(state)
        : state;
}

function shouldEndBettingRound(state: GameState): boolean {
    return bettingRoundComplete(
        state.table.seats,
        state.actedPositions,
        state.currentBet
    );
}

function updatePlayerStatus(
    seats: Seat[],
    position: number,
    status: PlayerStatus
): Seat[] {
    return seats.map((seat) => {
        if (seat.position !== position || !seat.player) {
            return seat;
        }

        return {
            ...seat,
            player: {
                ...seat.player,
                status,
            },
        }
    })
}