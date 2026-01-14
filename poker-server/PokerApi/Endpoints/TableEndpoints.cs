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
}
