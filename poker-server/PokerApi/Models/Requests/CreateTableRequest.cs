namespace PokerApi.Models;

public record CreateTableRequest
{
    public required string Name { get; init; }
    public int MaxPlayers { get; init; }
    public decimal SmallBlind { get; init; }
    public decimal BigBlind { get; init; }
}
