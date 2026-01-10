import type { Player } from './Player';

export interface Seat {
    position: number;
    player: Player | null;
}