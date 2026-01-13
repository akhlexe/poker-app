import { useReducer } from "react";
import { useParams } from "react-router-dom";
import { initialGameState } from "../mock/initialGameState";
import { visibleBoard } from "../state/board-selector";
import { gameReducer } from "../state/game-reducer";
import { ActionButtons } from "./ActionButtons";
import { Board } from "./Board";
import { GameInfo } from "./GameInfo";
import { Table } from "./Table";
import { canPlayerCheck } from "../state/betting-selector";

export function GameTable() {
  const { tableId } = useParams<{ tableId: string }>();
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const boardCards = visibleBoard(state.board, state.phase);

  // Mock code.
  const RAISE_AMOUNT = 20;
  const currentSeat = state.table.seats[state.currentPlayerPosition];
  const canAct =
    currentSeat.player &&
    currentSeat.player.status === "active" &&
    state.phase !== "showdown";
  const canPostBlinds = state.pot === 0;
  const canCheck = () =>
    canPlayerCheck(
      state.currentPlayerPosition,
      state.table.seats,
      state.currentBet
    );

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Poker Game - Table {tableId}</h1>

      <GameInfo
        pot={state.pot}
        phase={state.phase}
        currentBet={state.currentBet}
      />

      <Board cards={boardCards} />
      <Table
        table={state.table}
        currentPlayerPosition={state.currentPlayerPosition}
        onFold={(position) => {
          dispatch({ type: "FOLD", position });
        }}
      ></Table>

      {canPostBlinds && (
        <button
          onClick={() => {
            dispatch({ type: "POST_BLINDS" });
          }}
        >
          Post Blinds
        </button>
      )}

      <ActionButtons
        canAct={!!canAct}
        onCheck={() => {
          dispatch({
            type: "PLAYER_CHECK",
            position: state.currentPlayerPosition,
          });
        }}
        onCall={() => {
          dispatch({
            type: "PLAYER_CALL",
            position: state.currentPlayerPosition,
          });
        }}
        onRaise={() => {
          dispatch({
            type: "PLAYER_RAISE",
            position: state.currentPlayerPosition,
            amount: RAISE_AMOUNT,
          });
        }}
        canCheck={canCheck}
      />
    </div>
  );
}
