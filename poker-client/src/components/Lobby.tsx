import type { PokerTable } from "../models/Table";

interface Props {
  tables: PokerTable[];
  onJoin: (tableId: string) => void;
}

export function Lobby({ tables, onJoin }: Props) {
  return (
    <div>
      <h2>Lobby</h2>
      <ul>
        {tables.map((table) => (
          <li key={table.id}>
            {table.name} ({table.players}/{table.maxPlayers})
            <button onClick={() => onJoin(table.id)}>Join</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
