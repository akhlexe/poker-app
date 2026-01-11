import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Lobby.module.css";

interface TableInfo {
  id: string;
  name: string;
  currentPlayers: number;
  maxPlayers: number;
  smallBlind: number;
  bigBlind: number;
  minBuyIn: number;
  maxBuyIn: number;
}

export function Lobby() {
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // fetchTables();

    // Mock data for testing
    const mockTables: TableInfo[] = [
      {
        id: "1",
        name: "Table 1 - Beginner",
        currentPlayers: 3,
        maxPlayers: 6,
        smallBlind: 5,
        bigBlind: 10,
        minBuyIn: 100,
        maxBuyIn: 500,
      },
      {
        id: "2",
        name: "Table 2 - Intermediate",
        currentPlayers: 5,
        maxPlayers: 9,
        smallBlind: 10,
        bigBlind: 20,
        minBuyIn: 200,
        maxBuyIn: 1000,
      },
      {
        id: "3",
        name: "Table 3 - High Stakes",
        currentPlayers: 9,
        maxPlayers: 9,
        smallBlind: 50,
        bigBlind: 100,
        minBuyIn: 1000,
        maxBuyIn: 5000,
      },
      {
        id: "4",
        name: "Table 4 - Casual",
        currentPlayers: 1,
        maxPlayers: 6,
        smallBlind: 2,
        bigBlind: 5,
        minBuyIn: 50,
        maxBuyIn: 200,
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setTables(mockTables);
      setLoading(false);
    }, 500);
  }, []);

  const fetchTables = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5001/api/tables");
      if (!response.ok) {
        throw new Error("Failed to fetch tables");
      }
      const data = await response.json();
      setTables(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinTable = (tableId: string) => {
    navigate(`/table/${tableId}`);
  };

  if (loading) return <div className={styles.loading}>Loading tables...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Poker Lobby</h1>
        <button onClick={fetchTables} className={styles.refreshButton}>
          🔄 Refresh Tables
        </button>
      </div>

      {tables.length === 0 ? (
        <div className={styles.emptyState}>No tables available.</div>
      ) : (
        <div className={styles.tableGrid}>
          {tables.map((table) => {
            const isFull = table.currentPlayers >= table.maxPlayers;

            return (
              <div
                key={table.id}
                className={`${styles.tableCard} ${
                  isFull ? styles.fullTable : ""
                }`}
              >
                <div className={styles.tableHeader}>
                  <h3 className={styles.tableName}>{table.name}</h3>
                  <span className={styles.playerCount}>
                    {table.currentPlayers} / {table.maxPlayers}
                  </span>
                </div>

                <div className={styles.tableDetails}>
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Blinds:</span>
                    <span className={styles.detailValue}>
                      {table.smallBlind} / {table.bigBlind}
                    </span>
                  </div>

                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Buy-in:</span>
                    <span className={styles.detailValue}>
                      {table.minBuyIn} - {table.maxBuyIn}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleJoinTable(table.id)}
                  disabled={table.currentPlayers >= table.maxPlayers}
                  className={`${styles.joinButton} ${
                    isFull ? styles.disabled : ""
                  }`}
                >
                  {isFull ? "🔒 Full" : "▶ Join Table"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
