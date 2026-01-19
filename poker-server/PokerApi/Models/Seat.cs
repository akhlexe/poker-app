namespace PokerApi.Models;

public record Seat
{
    public int Position { get; init; }
    public Player? Player { get; init; }
}
