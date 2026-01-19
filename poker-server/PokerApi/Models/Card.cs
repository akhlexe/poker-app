namespace PokerApi.Models;

public record Card
{
    public required string Suit { get; init; }
    public required string Rank { get; init; }
}
