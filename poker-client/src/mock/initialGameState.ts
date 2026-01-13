import type { GameState } from "../models/GameState";
import { mockTable } from "./tableData";

export const initialGameState: GameState = {
    table: mockTable,
    pot: 0,
    currentPlayerPosition: 0,
    phase: "pre-flop",
    board: [
        { rank: "2", suit: "♥" },
        { rank: "K", suit: "♠" },
        { rank: "7", suit: "♦" },
        { rank: "A", suit: "♣" },
        { rank: "T", suit: "♥" }
    ],
    actedPositions: [],
    smallBlind: 5,
    bigBlind: 10,
    currentBet: 0,
}