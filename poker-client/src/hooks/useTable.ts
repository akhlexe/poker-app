import { useCallback, useEffect, useState } from "react";
import { API_CONFIG } from "../config/api-config";
import type { Card } from "../models/Card";
import type { GamePhase } from "../models/GamePhase";
import type { Seat } from "../models/Seat";

interface TableDetail {
    id: string;
    name: string;
    smallBlind: number;
    bigBlind: number;
    pot: number;
    currentBet: number;
    phase: GamePhase;
    board: Card[];
    seats: Seat[];
}

interface UseTableReturn {
    table: TableDetail | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export function useTable(tableId: string): UseTableReturn {
    const [table, setTable] = useState<TableDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchTable = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.table(tableId)}`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`Error fetching table: ${response.statusText}`);
            }

            const data: TableDetail = await response.json();
            setTable(data);

        } catch (err) {
            setError((err as Error).message);
            console.error("Failed to fetch table:", err);
        } finally {
            setLoading(false);
        }
    }, [tableId]);

    useEffect(() => {
        fetchTable();
    }, [fetchTable]);

    return {
        table,
        loading,
        error,
        refetch: fetchTable
    };
}