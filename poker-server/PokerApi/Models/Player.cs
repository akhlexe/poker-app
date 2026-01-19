namespace PokerApi.Models;

public record Player
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public decimal Chips { get; init; }
    public Card[] Cards { get; init; } = [];
    public required string Status { get; init; } // active, folded, sitting_out
    public decimal BetThisRound { get; init; }
}
