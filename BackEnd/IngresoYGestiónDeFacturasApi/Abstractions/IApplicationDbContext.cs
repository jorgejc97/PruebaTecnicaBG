namespace IngresoYGestiónDeFacturasApi.Abstractions;

public interface IApplicationDbContext
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}