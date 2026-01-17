import { useEffect, useReducer, useRef } from "react";
import { useParams } from "react-router-dom";
import { useTable } from "../hooks/useTable";
import { initialGameState } from "../mock/initialGameState";
import { canPlayerAct } from "../state/action-selector";
import { canPlayerCheck } from "../state/betting-selector";
import { gameReducer } from "../state/game-reducer";
import { ActionButtons } from "./ActionButtons";
import { Board } from "./Board";
import { GameInfo } from "./GameInfo";

export function GameTable() {
  const { tableId } = useParams<{ tableId: string }>();

  // Initialize with mock data immediately
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  // Fetch real table data from server
  const { table, loading, error } = useTable(tableId!);

  // Track if we've synced to prevent infinite loop
  const hasSynced = useRef(false);

  // Sync with server state when table data arrives (only once)
  useEffect(() => {
    if (table && !hasSynced.current) {
      console.log("Syncing server state:", table);
      hasSynced.current = true;
      dispatch({
        type: "SYNC_SERVER_STATE",
        payload: {
          pot: table.pot,
          phase: table.phase,
          currentBet: table.currentBet,
          board: table.board,
          table: {
            ...gameState.table,
            id: table.id,
            name: table.name,
            seats: table.seats,
          },
          smallBlind: table.smallBlind,
          bigBlind: table.bigBlind,
        },
      });
    }
  }, [table]);

  // Show loading overlay while fetching, but still render initial mock state

  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Show loading/error overlay */}
      {loading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            background: "rgba(0, 0, 0, 0.5)",
            color: "white",
            padding: "10px",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          Loading table data...
        </div>
      )}
      {error && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            background: "rgba(255, 0, 0, 0.7)",
            color: "white",
            padding: "10px",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          Error: {error}
        </div>
      )}

      <Board cards={gameState.board} />
      <GameInfo
        pot={gameState.pot}
        phase={gameState.phase}
        currentBet={gameState.currentBet}
      />

      <ActionButtons
        canAct={canPlayerAct(gameState)}
        onCheck={() =>
          dispatch({
            type: "PLAYER_CHECK",
            position: gameState.currentPlayerPosition,
          })
        }
        onCall={() =>
          dispatch({
            type: "PLAYER_CALL",
            position: gameState.currentPlayerPosition,
          })
        }
        onRaise={() =>
          dispatch({
            type: "PLAYER_RAISE",
            position: gameState.currentPlayerPosition,
            amount: 20,
          })
        }
        canCheck={() =>
          canPlayerCheck(
            gameState.currentPlayerPosition,
            gameState.table.seats,
            gameState.currentBet
          )
        }
      />
    </div>
  );
}
