using PokerApi.Models;

namespace PokerApi.Services;

public interface ITableStorageService
{
    IEnumerable<PokerTable> GetAllTables();
    PokerTable? GetTableById(string id);
    PokerTable CreateTable(CreateTableRequest request);
}

public class InMemoryTableStorageService : ITableStorageService
{
    private readonly List<PokerTable> _tables = [];
    private int _nextId = 1;

    public IEnumerable<PokerTable> GetAllTables()
    {
        return _tables;
    }

    public PokerTable? GetTableById(string id)
    {
        return _tables.FirstOrDefault(t => t.Id == id);
    }

    public PokerTable CreateTable(CreateTableRequest request)
    {
        var table = new PokerTable
        {
            Id = _nextId++.ToString(),
            Name = request.Name,
            CurrentPlayers = 0,
            MaxPlayers = request.MaxPlayers,
            SmallBlind = request.SmallBlind,
            BigBlind = request.BigBlind,
            MinBuyIn = request.BigBlind * 20,
            MaxBuyIn = request.BigBlind * 100
        };

        _tables.Add(table);
        return table;
    }
}
