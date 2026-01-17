import { useNavigate } from "react-router-dom";
import { useTables } from "../hooks/useTables";
import styles from "./Lobby.module.css";
import { useState } from "react";
import { CreateTableModal } from "./CreateTableModal";

export function Lobby() {
  const { tables, loading, error, refetch } = useTables();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleJoinTable = (tableId: string) => {
    navigate(`/table/${tableId}`);
  };

  const handleTableCreated = (tableId: string) => {
    navigate(`/table/${tableId}`);
  };

  if (loading) return <div className={styles.loading}>Loading tables...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Poker Lobby</h1>
        <button
          className={styles.refreshButton}
          onClick={() => setIsModalOpen(true)}
          style={{ marginRight: "1rem" }}
        >
          ➕ Create Table
        </button>
        <button onClick={refetch} className={styles.refreshButton}>
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

      <CreateTableModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTableCreated={handleTableCreated}
      />
    </div>
  );
}
