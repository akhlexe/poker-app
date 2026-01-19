using PokerApi.Services;

namespace PokerApi.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddPokerServices(this IServiceCollection services)
    {
        services.AddSingleton<ITableStorageService, InMemoryTableStorageService>();

        return services;
    }
}
