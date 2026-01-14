namespace PokerApi.Models;

public record PokerTable
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public int Players { get; init; }
    public int MaxPlayers { get; init; }
}
