import { useState, type FormEvent } from "react";
import styles from "./CreateTableModal.module.css";

interface CreateTableModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTableCreated: (tableId: string) => void;
}

interface CreateTableFormData {
  name: string;
  maxPlayers: number;
  smallBlind: number;
  bigBlind: number;
}

export function CreateTableModal({
  isOpen,
  onClose,
  onTableCreated,
}: CreateTableModalProps) {
  const [formData, setFormData] = useState<CreateTableFormData>({
    name: "",
    maxPlayers: 6,
    smallBlind: 5,
    bigBlind: 10,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5073/tables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to create table");
      }

      const newTable = await response.json();
      onTableCreated(newTable.id);
      handleClose();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      maxPlayers: 6,
      smallBlind: 5,
      bigBlind: 10,
    });
    setError(null);
    onClose();
  };

  const updateFormData = (
    field: keyof CreateTableFormData,
    value: string | number,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Create Table</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.formGroup}>
            <label htmlFor="tableName" className={styles.label}>
              Table Name
            </label>
            <input
              type="text"
              id="tableName"
              className={styles.input}
              value={formData.name}
              onChange={(e) => updateFormData("name", e.target.value)}
              placeholder="Enter table name"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="maxPlayers" className={styles.label}>
              Max Players
            </label>
            <select
              id="maxPlayers"
              className={styles.select}
              value={formData.maxPlayers}
              onChange={(e) =>
                updateFormData("maxPlayers", Number(e.target.value))
              }
              disabled={isSubmitting}
            >
              {[2, 6, 9].map((num) => (
                <option key={num} value={num}>
                  {num} Players
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="smallBlind" className={styles.label}>
                Small Blind
              </label>
              <input
                type="number"
                id="smallBlind"
                className={styles.input}
                value={formData.smallBlind}
                onChange={(e) =>
                  updateFormData("smallBlind", Number(e.target.value))
                }
                min={1}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bigBlind" className={styles.label}>
                Big Blind
              </label>
              <input
                id="bigBlind"
                type="number"
                className={styles.input}
                value={formData.bigBlind}
                onChange={(e) =>
                  updateFormData("bigBlind", Number(e.target.value))
                }
                min={formData.smallBlind * 2}
                required
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Table"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
