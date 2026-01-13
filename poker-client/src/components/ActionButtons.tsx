interface Props {
  canAct: boolean;
  onCheck: () => void;
  onCall: () => void;
  onRaise: () => void;
  canCheck: () => boolean;
}

export function ActionButtons({
  canAct,
  onCheck,
  onCall,
  onRaise,
  canCheck,
}: Props) {
  if (!canAct) {
    return null;
  }

  return (
    <div style={{ marginTop: 16, padding: 8 }}>
      <button onClick={onCheck} disabled={!canCheck()}>
        Check
      </button>
      <button onClick={onCall}>Call</button>
      <button onClick={onRaise}>Raise</button>
    </div>
  );
}
