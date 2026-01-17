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
import { Table } from "./Table";
import styles from "./GameTable.module.css";

interface Props {
  onBackToLobby: () => void;
}

export function GameTable({ onBackToLobby }: Props) {
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
    <div className={styles.container}>
      {/* Show loading/error overlay */}
      {loading && (
        <div className={styles.loadingOverlay}>Loading table data...</div>
      )}
      {error && <div className={styles.errorOverlay}>Error: {error}</div>}

      <button
        onClick={onBackToLobby}
        style={{ position: "absolute", top: 10, left: 10 }}
      >
        Back to Lobby
      </button>

      <div className={styles.contentWrapper}>
        <GameInfo
          pot={gameState.pot}
          phase={gameState.phase}
          currentBet={gameState.currentBet}
        />

        <Board cards={gameState.board} />

        <Table
          table={gameState.table}
          currentPlayerPosition={gameState.currentPlayerPosition}
          onFold={(position) =>
            dispatch({
              type: "FOLD",
              position,
            })
          }
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
              gameState.currentBet,
            )
          }
        />
      </div>
    </div>
  );
}
