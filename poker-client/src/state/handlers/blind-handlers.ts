import type { GameState } from "../../models/GameState";
import { resetBets } from "../betting-selector";
import { findNextPosition } from "../player-navigation";
import { updatePlayer } from "../utils/seat-utils";

export function handlePostBlinds(state: GameState) {
    const dealerPos = state.table.dealerPosition;
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

    console.log(`Small Blind posted by position ${sbPos}`);
    console.log(`Big Blind posted by position ${bbPos}`);

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