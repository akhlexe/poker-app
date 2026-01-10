import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    fetchTables();
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

  if (loading) return <div>Loading tables...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Poker Lobby</h1>
      <button onClick={fetchTables} style={{ marginBottom: "20px" }}>
        Refresh Tables
      </button>

      {tables.length === 0 ? (
        <div>No tables available.</div>
      ) : (
        <div style={{ display: "grid", gap: "16px" }}>
          {tables.map((table) => (
            <div
              key={table.id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <h3>{table.name}</h3>
                <p>
                  Players: {table.currentPlayers} / {table.maxPlayers}
                </p>
                <p>
                  Blinds: {table.smallBlind} / {table.bigBlind}
                </p>
                <p>
                  Buy-in: {table.minBuyIn} - {table.maxBuyIn}
                </p>
                <button
                  onClick={() => handleJoinTable(table.id)}
                  disabled={table.currentPlayers >= table.maxPlayers}
                >
                  {table.currentPlayers >= table.maxPlayers
                    ? "Full"
                    : "Join Table"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
