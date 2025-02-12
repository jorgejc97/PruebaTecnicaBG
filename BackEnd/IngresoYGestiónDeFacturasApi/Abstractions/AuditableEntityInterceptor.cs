namespace IngresoYGestiónDeFacturasApi.Abstractions;

public class AuditableEntityInterceptor : SaveChangesInterceptor
{
    public override InterceptionResult<int> SavingChanges(DbContextEventData eventData, InterceptionResult<int> result)
    {
        UpdateEntities(eventData.Context);
        return base.SavingChanges(eventData, result);
    }

    public override ValueTask<InterceptionResult<int>> SavingChangesAsync(DbContextEventData eventData, InterceptionResult<int> result,
        CancellationToken cancellationToken = new())
    {
        UpdateEntities(eventData.Context);
        return base.SavingChangesAsync(eventData, result, cancellationToken);
    }

    private static void UpdateEntities(DbContext? context)
    {
        if (context is null) return;
        foreach (var entry in context.ChangeTracker.Entries<IEntity>())
        {
            if (entry.State == EntityState.Added)
            {
                entry.Entity.CreatedBy = "System";
                entry.Entity.CreatedAt = DateTime.UtcNow;
                entry.Entity.Active = true;
            }
            if (entry.State != EntityState.Added && entry.State != EntityState.Modified &&
                !entry.HasChangedOwnedEntities()) continue;
            entry.Entity.LastModifiedBy = "System";
            entry.Entity.LastModified = DateTime.UtcNow;
            if (entry.State == EntityState.Deleted)
            {
                entry.State = EntityState.Modified;
                entry.Entity.DeletedAt = DateTime.UtcNow;
                entry.Entity.DeletedBy = "System";
                entry.Entity.Active = false;
            }
            else continue;

        }

    }
}

public static class Extensions
{
    public static bool HasChangedOwnedEntities(this EntityEntry entry) =>
        entry.References.Any(r =>
            r.TargetEntry is not null &&
            r.TargetEntry.Metadata.IsOwned() &&
            r.TargetEntry.State is EntityState.Added or EntityState.Modified);
}