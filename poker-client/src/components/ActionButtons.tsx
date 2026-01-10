interface Props {
  canAct: boolean;
  onCheck: () => void;
  onCall: () => void;
  onRaise: () => void;
}

export function ActionButtons({ canAct, onCheck, onCall, onRaise }: Props) {
  if (!canAct) {
    return null;
  }

  return (
    <div style={{ marginTop: 16, padding: 8 }}>
      <button onClick={onCheck}>Check</button>
      <button onClick={onCall}>Call</button>
      <button onClick={onRaise}>Raise</button>
    </div>
  );
}
