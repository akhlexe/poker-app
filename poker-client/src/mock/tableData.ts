import type { GameTable } from "../models/GameTable";
import { card } from "./deckHelper";

export const mockTable: GameTable = {
    id: "table-1",
    name: "NL Holdem 1/2",
    dealerPosition: 2,
    seats: [
        {
            position: 0,
            player: {
                id: "player-1",
                name: "Alice",
                chips: 1500,
                cards: [card("A", "♠"), card("K", "♠")],
                status: "active",
                betThisRound: 0
            }
        },
        { position: 1, player: null },
        {
            position: 2,
            player: {
                id: "player-2",
                name: "Bob",
                chips: 1000,
                cards: [card("Q", "♦"), card("J", "♦")],
                status: "active",
                betThisRound: 0
            }
        },
        { position: 3, player: null },
        {
            position: 4,
            player: {
                id: "player-3",
                name: "Carol",
                chips: 950,
                cards: [card("7", "♣"), card("8", "♣")],
                status: "active",
                betThisRound: 0
            }
        },
        { position: 5, player: null },
    ],
}