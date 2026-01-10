export type GameAction =
    | { type: "POST_BLINDS" }
    | { type: "NEXT_PLAYER" }
    | { type: "FOLD"; position: number }
    | { type: "ADD_TO_POT"; amount: number }
    | { type: "PLAYER_CHECK"; position: number }
    | { type: "PLAYER_CALL"; position: number; amount: number }
    | { type: "PLAYER_RAISE"; position: number; amount: number }
    | { type: "END_TURN" };