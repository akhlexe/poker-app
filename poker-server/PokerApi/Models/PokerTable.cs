namespace PokerApi.Models;

public record PokerTable
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public int CurrentPlayers { get; init; }
    public int MaxPlayers { get; init; }
    public decimal SmallBlind { get; init; }
    public decimal BigBlind { get; init; }
    public decimal MinBuyIn { get; init; }
    public decimal MaxBuyIn { get; init; }
}
