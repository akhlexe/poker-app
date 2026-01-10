import { useReducer } from "react";
import { Table } from "../components/Table";
import "./App.css";
import { gameReducer } from "../state/gameReducer";
import { initialGameState } from "../mock/initialGameState";
import { Board } from "../components/Board";
import { visibleBoard } from "../state/boardSelector";
import { ActionButtons } from "../components/ActionButtons";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Lobby } from "../components/Lobby";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/lobby" replace />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/table/:tableId" element={<GameTable />} />
      </Routes>
    </BrowserRouter>
  );
}

function GameTable() {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const boardCards = visibleBoard(state.board, state.phase);

  // Mock code.
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
