namespace IngresoYGesti�nDeFacturasApi.Abstractions;

public interface IApplicationDbContext
{
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}