import { useReducer } from "react";
import { initialGameState } from "../mock/initialGameState";
import { visibleBoard } from "../state/board-selector";
import { ActionButtons } from "./ActionButtons";
import { Board } from "./Board";
import { Table } from "./Table";
import { gameReducer } from "../state/game-reducer";
import { useParams } from "react-router-dom";

export function GameTable() {
  const { tableId } = useParams<{ tableId: string }>();
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const boardCards = visibleBoard(state.board, state.phase);

  // Mock code.
  const RAISE_AMOUNT = 20;
  const currentSeat = state.table.seats[state.currentPlayerPosition];
  const canAct = currentSeat.player && currentSeat.player.status === "active";

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      <h1>Poker Game - Table {tableId}</h1>

      <div style={{ marginTop: 16, marginBottom: "10px" }}>
        <div>Pot: {state.pot}</div>
        <div>Phase: {state.phase}</div>
      </div>

      <Board cards={boardCards} />
      <Table
        table={state.table}
        currentPlayerPosition={state.currentPlayerPosition}
        onFold={(position) => {
          dispatch({ type: "FOLD", position });
        }}
      ></Table>

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
      />
    </div>
  );
}
