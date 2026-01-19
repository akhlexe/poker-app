namespace PokerApi.Models;

public record Table
{
    public required string Id { get; init; }
    public required string Name { get; init; }
    public decimal SmallBlind { get; init; }
    public decimal BigBlind { get; init; }
    public decimal Pot { get; init; }
    public decimal CurrentBet { get; init; }
    public required string Phase { get; init; } // preflop, flop, turn, river, showdown
    public Card[] Board { get; init; } = [];
    public Seat[] Seats { get; init; } = [];
}
