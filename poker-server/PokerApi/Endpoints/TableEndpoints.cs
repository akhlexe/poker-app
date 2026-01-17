using PokerApi.Models;

namespace PokerApi.Endpoints;

public static class TableEndpoints
{
    public static void MapTableEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/tables")
            .WithTags("Tables");

        group.MapGet("", GetTables)
            .WithName("GetTables")
            .WithOpenApi();

        group.MapGet("{id}", GetTableById)
            .WithName("GetTableById")
            .WithOpenApi();
    }

    private static IResult GetTables()
    {
        var tables = new[]
        {
            new PokerTable
            {
                Id = "1",
                Name = "NL Holdem 1/2",
                CurrentPlayers = 3,
                MaxPlayers = 6,
                SmallBlind = 1,
                BigBlind = 2,
                MinBuyIn = 40,
                MaxBuyIn = 200
            },
            new PokerTable
            {
                Id = "2",
                Name = "NL Holdem 5/10",
                CurrentPlayers = 5,
                MaxPlayers = 6,
                SmallBlind = 5,
                BigBlind = 10,
                MinBuyIn = 200,
                MaxBuyIn = 1000
            },
            new PokerTable
            {
                Id = "3",
                Name = "NL Holdem 2/5",
                CurrentPlayers = 2,
                MaxPlayers = 6,
                SmallBlind = 2,
                BigBlind = 5,
                MinBuyIn = 100,
                MaxBuyIn = 500
            },
        };

        return Results.Ok(tables);
    }

    private static IResult GetTableById(string id)
    {
        // Mock detailed table state - later this will come from your game engine
        var player1 = new
        {
            Id = "p1",
            Name = "Alice",
            Chips = 200,
            Cards = new[]
            {
                new { Suit = "♠", Rank = "A" },
                new { Suit = "♠", Rank = "K" }
            },
            Status = "active",
            BetThisRound = 10
        };

        var player2 = new
        {
            Id = "p2",
            Name = "Bob",
            Chips = 150,
            Cards = new[]
            {
                new { Suit = "♦", Rank = "Q" },
                new { Suit = "♦", Rank = "J" }
            },
            Status = "active",
            BetThisRound = 10
        };

        var player3 = new
        {
            Id = "p3",
            Name = "Carol",
            Chips = 95,
            Cards = new[]
            {
                new { Suit = "♣", Rank = "7" },
                new { Suit = "♣", Rank = "8" }
            },
            Status = "folded",
            BetThisRound = 5
        };

        var table = new
        {
            Id = id,
            Name = "NL Holdem 1/2",
            SmallBlind = 1,
            BigBlind = 2,
            Pot = 45,
            CurrentBet = 10,
            Phase = "flop", // preflop, flop, turn, river, showdown
            Board = new[]
            {
                new { Suit = "♥", Rank = "A" },
                new { Suit = "♦", Rank = "K" },
                new { Suit = "♣", Rank = "Q" }
            },
            Seats = new object[]
            {
                new { Position = 0, Player = player1 },
                new { Position = 1, Player = (object?)null },
                new { Position = 2, Player = player2 },
                new { Position = 3, Player = (object?)null },
                new { Position = 4, Player = player3 },
                new { Position = 5, Player = (object?)null }
            }
        };

        return Results.Ok(table);
    }
}
