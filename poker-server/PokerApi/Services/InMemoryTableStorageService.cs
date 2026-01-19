using PokerApi.Models;

namespace PokerApi.Services;

public interface ITableStorageService
{
    IEnumerable<Table> GetAllTables();
    Table? GetTableById(string id);
    Table CreateTable(CreateTableRequest request);
}

public class InMemoryTableStorageService : ITableStorageService
{
    private readonly Dictionary<string, Table> _tables = [];

    public IEnumerable<Table> GetAllTables()
    {
        return _tables.Values;
    }

    public Table? GetTableById(string id)
    {
        return _tables.GetValueOrDefault(id);
    }

    public Table CreateTable(CreateTableRequest request)
    {
        var id = Guid.NewGuid().ToString();

        var table = new Table
        {
            Id = id,
            Name = request.Name,
            SmallBlind = request.SmallBlind,
            BigBlind = request.BigBlind,
            Pot = 0,
            CurrentBet = 0,
            Phase = "preflop",
            Board = [],
            Seats = InitializeSeats(request.MaxPlayers)
        };

        _tables[id] = table;

        return table;
    }

    private static Seat[] InitializeSeats(int maxPlayers)
    {
        var seats = new Seat[maxPlayers];
        for (int i = 0; i < maxPlayers; i++)
        {
            seats[i] = new Seat { Position = i, Player = null };
        }
        return seats;
    }
}
