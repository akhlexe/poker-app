import { useEffect, useState } from "react";

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

interface UseTablesReturn {
    tables: TableInfo[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useTables(): UseTablesReturn {
    const [tables, setTables] = useState<TableInfo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTables = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch("http://localhost:5073/tables");
            if (!response.ok) {
                throw new Error(`Error fetching tables: ${response.statusText}`);
            }

            const data: TableInfo[] = await response.json();
            setTables(data);
        } catch (err) {
            setError((err as Error).message);
            console.error("Failed to fetch tables:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    return { tables, loading, error, refetch: fetchTables };
}