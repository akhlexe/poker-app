import { useReducer } from "react";
import { Table } from "../components/Table";
import "./App.css";
import { gameReducer } from "../state/gameReducer";
import { initialGameState } from "../mock/initialGameState";
import { Board } from "../components/Board";
import { visibleBoard } from "../state/boardSelector";
import { ActionButtons } from "../components/ActionButtons";

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const boardCards = visibleBoard(state.board, state.phase);

  // Mock code.
  const CALL_AMOUNT = 10;
  const RAISE_AMOUNT = 20;
  const currentSeat = state.table.seats[state.currentPlayerPosition];
  const canAct = currentSeat.player && currentSeat.player.status === "active";

  return (
    <div>
      <h1>Poker Game</h1>
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
            amount: CALL_AMOUNT,
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

export default App;
