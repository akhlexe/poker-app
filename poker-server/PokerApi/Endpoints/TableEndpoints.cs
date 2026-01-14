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
            new PokerTable { Id = "1", Name = "NL Holdem 1/2", Players = 3, MaxPlayers = 6 },
            new PokerTable { Id = "2", Name = "NL Holdem 5/10", Players = 5, MaxPlayers = 6 },
            new PokerTable { Id = "3", Name = "NL Holdem 2/5", Players = 2, MaxPlayers = 6 },
        };

        return Results.Ok(tables);
    }
}
