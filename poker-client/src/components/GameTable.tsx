import { useReducer } from "react";
import { initialGameState } from "../mock/initialGameState";
import { visibleBoard } from "../state/boardSelector";
import { ActionButtons } from "./ActionButtons";
import { Board } from "./Board";
import { Table } from "./Table";
import { gameReducer } from "../state/gameReducer";
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
    <div>
      <h1>Poker Game - Table {tableId}</h1>
      <ActionButtons
        canAct={!!canAct}
        onCheck={() => {
          dispatch({
            type: "PLAYER_CHECK",
            position: state.currentPlayerPosition,
          });
          dispatch({ type: "END_TURN" });
          dispatch({ type: "NEXT_PLAYER" });
        }}
        onCall={() => {
          dispatch({
            type: "PLAYER_CALL",
            position: state.currentPlayerPosition,
          });
          dispatch({ type: "NEXT_PLAYER" });
        }}
        onRaise={() => {
          dispatch({
            type: "PLAYER_RAISE",
            position: state.currentPlayerPosition,
            amount: RAISE_AMOUNT,
          });
          dispatch({ type: "END_TURN" });
          dispatch({ type: "NEXT_PLAYER" });
        }}
      />
      <Board cards={boardCards} />
      <Table
        table={state.table}
        currentPlayerPosition={state.currentPlayerPosition}
        onFold={(position) => {
          dispatch({ type: "FOLD", position });
          dispatch({ type: "END_TURN" });
          dispatch({ type: "NEXT_PLAYER" });
        }}
      ></Table>

      <div style={{ marginTop: 16 }}>
        <div>Pot: {state.pot}</div>
        <div>Phase: {state.phase}</div>
      </div>
    </div>
  );
}
