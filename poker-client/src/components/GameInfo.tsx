interface Props {
  pot: number;
  phase: string;
  currentBet: number;
  
}

export function GameInfo({ pot, phase, currentBet }: Props) {
  return (
    <div>
      
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          padding: "1rem",
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          borderRadius: "12px",
          marginBottom: "1.5rem",
          border: "2px solid #0f4c75",
        }}
      >
        {/* Pot */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "0.9em", color: "#b8b8b8", marginBottom: 4 }}>
            POT
          </div>
          <div
            style={{
              fontSize: "1.8em",
              fontWeight: "bold",
              color: "#00d9ff",
              textShadow: "0 0 10px rgba(0, 217, 255, 0.5)",
            }}
          >
            ${pot}
          </div>
        </div>

        {/* Current Bet */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "0.9em", color: "#b8b8b8", marginBottom: 4 }}>
            CURRENT BET
          </div>
          <div
            style={{
              fontSize: "1.8em",
              fontWeight: "bold",
              color: "#ffcc00",
            }}
          >
            ${currentBet}
          </div>
        </div>

        {/* Phase */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "0.9em", color: "#b8b8b8", marginBottom: 4 }}>
            PHASE
          </div>
          <div
            style={{
              fontSize: "1.5em",
              fontWeight: "bold",
              color: "#00ff88",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            {phase}
          </div>
        </div>
      </div>
    </div>
  );
}
