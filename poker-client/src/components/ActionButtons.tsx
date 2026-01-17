import styles from "./ActionButtons.module.css";

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
    <div className={styles.actionButtonContainer}>
      <button
        className={styles.actionButton}
        onClick={onCheck}
        disabled={!canCheck()}
      >
        Check
      </button>
      <button className={styles.actionButton} onClick={onCall}>
        Call
      </button>
      <button className={styles.actionButton} onClick={onRaise}>
        Raise
      </button>
    </div>
  );
}
