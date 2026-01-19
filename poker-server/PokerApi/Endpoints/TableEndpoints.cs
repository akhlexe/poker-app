using PokerApi.Models;
using PokerApi.Services;

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

        group.MapPost("", CreateTable)
            .WithName("CreateTable")
            .WithOpenApi();
    }

    private static IResult GetTables(ITableStorageService tableStorage)
    {
        var tables = tableStorage.GetAllTables();
        return Results.Ok(tables);
    }

    private static IResult CreateTable(CreateTableRequest request, ITableStorageService tableStorage)
    {
        var table = tableStorage.CreateTable(request);
        return Results.Created($"/tables/{table.Id}", table);
    }

    private static IResult GetTableById(string id, ITableStorageService tableStorage)
    {
        var table = tableStorage.GetTableById(id);

        if (table is null)
        {
            return Results.NotFound(new { message = $"Table with id '{id}' not found" });
        }

        return Results.Ok(table);
    }
}
