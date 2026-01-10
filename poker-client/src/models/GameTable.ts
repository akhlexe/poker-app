import type { Seat } from "./Seat";

export interface GameTable {
    id: string;
    name: string;
    seats: Seat[];
    dealerPosition: number;
}