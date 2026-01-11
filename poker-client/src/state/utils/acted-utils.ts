export function markPlayerActed(
    acted: number[],
    position: number
): number[] {
    return acted.includes(position)
        ? acted
        : [...acted, position];
}

export function clearActedPositions(): number[] {
    return [];
}