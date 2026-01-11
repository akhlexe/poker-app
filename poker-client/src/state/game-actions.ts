export type GameAction =
    | { type: "POST_BLINDS" }
    | { type: "FOLD"; position: number }
    | { type: "PLAYER_CHECK"; position: number }
    | { type: "PLAYER_CALL"; position: number; }
    | { type: "PLAYER_RAISE"; position: number; amount: number };