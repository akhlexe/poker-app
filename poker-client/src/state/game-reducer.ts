import type { GameState } from "../models/GameState";
import type { GameAction } from "./game-actions";
import { handleCall, handleCheck, handleRaise } from "./handlers/betting-handlers";
import { handlePostBlinds } from "./handlers/blind-handlers";
import { handleFold } from "./handlers/player-handlers";

export function gameReducer(
    state: GameState,
    action: GameAction
): GameState {
    switch (action.type) {
        case "SYNC_SERVER_STATE":
            return handleSyncServerState(state, action);
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

function handleSyncServerState(
    state: GameState,
    action: { type: "SYNC_SERVER_STATE"; payload: Partial<GameState>; }): GameState {
    return {
        ...state,
        ...action.payload
    }
}
